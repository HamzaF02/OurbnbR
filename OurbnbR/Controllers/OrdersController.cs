using Microsoft.AspNetCore.Mvc;
using OurbnbR.DAL;
using OurbnbR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NuGet.Protocol.Core.Types;

namespace OurbnbR.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrdersController : ControllerBase
    {
        //Serilogger
        private readonly ILogger<OrdersController> _logger;

        //Repositories for Order, Rental and Customer
        private readonly IRepository<Order> _repository;
        private readonly IRepository<Rental> _Rrepository;
        private readonly IRepository<Customer> _Crepository;

        //Constructor for class and defines variables
        public OrdersController(ILogger<OrdersController> logger, IRepository<Order> repository, IRepository<Customer> crepository, IRepository<Rental> Rrepository)
        {
            _logger = logger;
            _repository = repository;
            _Crepository = crepository;
            _Rrepository = Rrepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
           var orders = await _repository.GetAll();
           if (orders == null)
           {
               _logger.LogError("[OrderController] Order list not found while executing _repository.GetAll()");
               return NotFound("Order list not found");
           }
           return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            //Gets current order
            var order = await _repository.getObjectById(id);

            //Checks if there was a problem
            if (order == null)
            {
                _logger.LogError("[OrderController] Order not found for the orderId {orderId:0000}", id);
                return NotFound("Order not found for the orderId");
            }

            //Returns View
            return Ok(order);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Order order)
        {
            try { 
                var customer = await _Crepository.getObjectById(order.CustomerId);
                var rental = await _Rrepository.getObjectById(order.RentalId);

                //Checks if values are valid
                if (customer == null || rental == null)
                {
                    _logger.LogError("[OrdersController] Failed to find customer or rental with _Crepository.getObjectById() or _Rrepository.getObjectById()");
                    return BadRequest("Customer or Rental not found");
                }

                //Calculates total Price
                var Days = order.To - order.From;
                var totalPrice = Days.Days * rental.Price;

                //Checks Date and responds accordingly
                Order newOrder = new Order { };
                if (order.From >= rental.FromDate && order.From >= DateTime.Now.Date && order.From < rental.ToDate && order.From < order.To && order.To <= rental.ToDate)
                {
                    //Creation of Order object
                    newOrder = new Order
                    {
                        Customer = customer,
                        Rental = rental,
                        CustomerId = order.CustomerId,
                        RentalId = order.RentalId,
                        From = order.From,
                        To = order.To,
                        TotalPrice = totalPrice,
                        Rating = order.Rating,
                    };
                }
                else
                {
                    //logs and return error message to view
                    _logger.LogError("Dates for order are invalid");
                    return BadRequest("Dates not valid");
                }


                //Creates Order and checks for mistakes
                bool ok = await _repository.Create(newOrder);
                if (!ok)
                {
                    _logger.LogWarning("[OrdersController] newOrder creation failed {@newOrder}", newOrder);
                    return Ok(new ServerResponse { success=false, message="Order creation failed"});
                }

                //Updates rentals Rating
                await UpdateRental(rental);

               //Redirects to Main Orders Page
               return Ok(new ServerResponse { success=true, message="Order creation complete"});
            }
            catch (Exception ex)
            {
                //In case of exception it logs error and goes back to input field with message
                _logger.LogWarning("[OrdersController] newOrder creation failed, error message: {ex}", ex.Message);
                return Ok(new ServerResponse { success = false, message = "Order creation failed" });
    }
}



        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Order order)
        {

            //try catch for creation incase of exception
            try
            {
                //Gets customer and rental assosiated with order
                var customer = await _Crepository.getObjectById(order.CustomerId);
                var rental = await _Rrepository.getObjectById(order.RentalId);

                //Checks if values are valid
                if (customer == null || rental == null)
                {
                    _logger.LogError("[OrdersController] Failed to find customer or rental with _Crepository.getObjectById() or _Rrepository.getObjectById()");
                    return BadRequest("Rental or Customer does not exist");
                }

                //Calculates total Price
                var Days = order.To - order.From;
                var total = Days.Days * rental.Price;

                //Checks Date and responds accordingly
                Order newOrder = new Order { };
                if (order.From >= rental.FromDate && order.From >= DateTime.Now.Date && order.From < rental.ToDate && order.From < order.To && order.To <= rental.ToDate)
                {
                    //Creation of Order, OrderId is added since we are updating a value
                    newOrder = new Order
                    {
                        OrderId = order.OrderId,
                        Customer = customer,
                        Rental = rental,
                        CustomerId = order.CustomerId,
                        RentalId = order.RentalId,
                        From = order.From,
                        To = order.To,
                        TotalPrice = total,
                        Rating = order.Rating,
                    };
                }
                else
                {
                    //Logs error and returns view with message
                    _logger.LogError("dates for order are invalid");
                    return BadRequest("Dates not valid");
                }
                //Repository updates and checks it
                bool ok = await _repository.Update(newOrder);
                if (ok)
                {
                    //Updates rental rating and goes back to listoforders
                    await UpdateRental(rental);
                    return Ok(new ServerResponse { success = true, message = "Update order" });
                }
                _logger.LogError("[OrdersController] Order failed to update {@order}", order);
                return Ok(new ServerResponse { success = false, message = "Order update failed" });

            }
            catch (Exception ex)
            {
                //In case of exception it logs error and returns view with message
                _logger.LogError("[OrdersController] Order failed to update {@order}, error message: {ex} ", order, ex.Message);
                return Ok(new ServerResponse { success = false, message = "Order updatea failed" });

            }
        }

        //Deletes Rental
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            //Finds order and deletes it.
            var order = await _repository.getObjectById(id);
            bool OK = await _repository.Delete(id);

            //If all goes right it deletes order and updates rental Rating
            if (OK)
            {
                if (order != null)
                {
                    await UpdateRental(order.RentalId);
                }
                //Redirects to ListofOrders
                return Ok(new ServerResponse { success = true, message = "Order has been deleted" });
            }

            //Error handling incase of deletion mistake
            _logger.LogError("[OrdersController] Order deletion failed for the order.Rentalid {@order.RentalId}", id);
            return BadRequest("Order deletion failed, return to homepage");

        }



        public async Task UpdateRental(int id)
        {
            //Finds rental from id
            var rental = await _Rrepository.getObjectById(id);
            if (rental != null)
            {
                //If rental is found update its rating through its own function
                rental.UpdateRating();
                //Update in database
                await _Rrepository.Update(rental);

            }
        }
        //Update Rentals Rating
        public async Task UpdateRental(Rental rental)
        {
            //Update its rating through its own function
            rental.UpdateRating();
            //Update in database
            await _Rrepository.Update(rental);
        }
    }
}
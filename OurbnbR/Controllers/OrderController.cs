using Microsoft.AspNetCore.Mvc;
using Ourbnb.DAL;
using Ourbnb.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace OurbnbR.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {

        private readonly IRepository<Order> _repository;
        private readonly IRepository<Customer> _Crepository;

        //Serilogger
        private readonly ILogger<OrderController> _logger;

        //Constructor for class and defines variables
        public OrderController(IRepository<Order> orderRepository, IRepository<Customer> Crepository, ILogger<OrderController> logger)
        {
            _repository = orderRepository;
            _Crepository = Crepository;
            _logger = logger;
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
    }
}
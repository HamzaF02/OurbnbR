using Microsoft.AspNetCore.Mvc;
using OurbnbR.DAL;
using OurbnbR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;

namespace OurbnbR.Controllers
{
    [ApiController]
    [Route("api/rentals")]
    public class RentalController : ControllerBase
    {

        private readonly IRepository<Rental> _repository;
        private readonly IRepository<Customer> _Crepository;

        //Serilogger
        private readonly ILogger<RentalController> _logger;

        //Constructor for class and defines variables
        public RentalController(IRepository<Rental> rentalRepository, IRepository<Customer> Crepository, ILogger<RentalController> logger)
        {
            _repository = rentalRepository;
            _Crepository = Crepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
           var rentals = await _repository.GetAll();
           if (rentals == null)
           {
               _logger.LogError("[RentalController] Rental list not found while executing _repository.GetAll()");
               return NotFound("Rental list not found");
           }
           return Ok(rentals);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetObjectById(int id)
        {
            //Gets current Rental
            var rental = await _repository.getObjectById(id);

            //Checks if there was a problem
            if (rental == null)
            {
                _logger.LogError("[RentalController] Rental not found for the RentalId {RentalId:0000}", id);
                return NotFound("Rental not found for the RentalId");
            }

            //Returns View
            return Ok(rental);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody]Rental rental)
        {
            try
            {
                //Gets Owner and checks it
                var owner = await _Crepository.getObjectById(rental.OwnerId);
                if (owner == null)
                {
                    return BadRequest("Owner not Found");
                }

                //Initilize rental
                Rental newRental = new Rental { };

                //Checks if dates are valid
                int checkDate = DateTime.Compare(rental.FromDate, rental.ToDate);
                if ((checkDate < 0 && rental.FromDate >= DateTime.Now.Date))
                {
                    //Creation of Rental object
                    newRental = new Rental
                    {
                        Name = rental.Name,
                        Description = rental.Description,
                        FromDate = rental.FromDate,
                        ToDate = rental.ToDate,
                        Owner = owner,
                        OwnerId = rental.OwnerId,
                        Price = rental.Price,
                        Image = rental.Image,
                        Location = rental.Location,
                        Rating = 0
                    };
                }
                else
                {
                    //logs and return error message to view
                    _logger.LogWarning("Dates are not valid");
                    return BadRequest("Dates not valid");

                }
                bool ok = await _repository.Create(newRental);
                if (!ok)
                {
                    //logs and return error message to view
                    _logger.LogWarning("[RentalController] Rental creation failed {@rental}", rental);
                    return Ok(new ServerResponse{ success= false, message= "Rental creation failed"});
                }
                //Redirects to Main Rentals Page
                return Ok(new ServerResponse { success = true, message = "Rental created"});
            }
            catch (Exception ex)
            {
                //In case of exception it logs error and goes back to input field with message
                _logger.LogWarning("[RentalController] Rental creation failed {@rental}, error message: {ex}", rental, ex.Message);
                return Ok(new ServerResponse { success = false, message = "Rental creation failed"});
            }
        }


        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Rental rental)
        {
            try
            {
                //Gets Owner and checks it
                var owner = await _Crepository.getObjectById(rental.OwnerId);
                if (owner == null)
                {
                    return BadRequest("Owner not Found");
                }

                //Initilize rental
                Rental newRental = new Rental { };

                //Checks if dates are valid
                int checkDate = DateTime.Compare(rental.FromDate, rental.ToDate);
                if (checkDate < 0 && rental.FromDate >= DateTime.Now.Date)
                {
                    //Creation of Rental object
                    newRental = new Rental
                    {
                        RentalId = rental.RentalId,
                        Name = rental.Name,
                        Description = rental.Description,
                        FromDate = rental.FromDate,
                        ToDate = rental.ToDate,
                        Owner = owner,
                        OwnerId = rental.OwnerId,
                        Price = rental.Price,
                        Image = rental.Image,
                        Location = rental.Location,
                        Rating = rental.Rating,
                        Orders = rental.Orders,
                    };
                }
                else
                {
                    //logs and return error message to view
                    _logger.LogWarning("Dates are not valid");
                    return BadRequest("Dates not valid");

                }
                bool ok = await _repository.Update(newRental);
                if (!ok)
                {
                    //logs and return error message to view
                    _logger.LogWarning("[RentalController] Rental update failed {@rental}", rental);
                    return Ok(new ServerResponse { success = false, message = "Rental Update failed" });
                }
                //Redirects to Main Rentals Page
                return Ok(new ServerResponse { success = true, message = "Rental Updated" });
            }
            catch (Exception ex)
            {
                //In case of exception it logs error and goes back to input field with message
                _logger.LogWarning("[RentalController] Rental update failed {@rental}, error message: {ex}", rental, ex.Message);
                return Ok(new ServerResponse { success = false, message = "Rental updatea failed" });
            }
        }

        //Deletes Rental
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromBody]int id)
        {
            //Delets Rental and if it fails, deals with it accordingly with logs and BadRequest
            try
            {
                bool OK = await _repository.Delete(id);
                if (!OK)
                {
                    _logger.LogError("[RentalController] Rental deletion failed for the RentalId {RentalId:0000}", id);
                    return Ok(new ServerResponse { success = false, message = "Rental deletion failed" });
                }
                return Ok(new ServerResponse { success = true, message = "Rental Deletion complete" });
            }
            catch(Exception ex)
            {
                _logger.LogError("[RentalController] Rental deletion failed for the RentalId {RentalId:0000}, error: {ex}", id,ex.Message);
                return BadRequest("Rental deletion failed, return to homepage");
            }
        }


    }
}

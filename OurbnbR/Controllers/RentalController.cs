using Microsoft.AspNetCore.Mvc;
using Ourbnb.DAL;
using Ourbnb.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
            _logger.LogInformation("rentals: "+ rentals);
           if (rentals == null)
           {
               _logger.LogError("[RentalController] Rental list not found while executing _repository.GetAll()");
               return NotFound("Rental list not found");
           }
           return Ok(rentals);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
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
    }
}
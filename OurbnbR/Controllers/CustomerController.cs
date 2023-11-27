using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OurbnbR.DAL;
using OurbnbR.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OurbnbR.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : Controller
    {
        private readonly IRepository<Customer> _repository;

        //Serilogger
        private readonly ILogger<RentalController> _logger;

        //Constructor for class and defines variables
        public CustomerController(IRepository<Customer> repository, ILogger<RentalController> logger)
        {
            _repository = repository;
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _repository.GetAll();
            if (customers == null)
            {
                _logger.LogError("[CustomerController] customer list not found while executing _Crepository.GetAll()");
                return NotFound("Customer list not found");
            }
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            //Gets current order
            var customer = await _repository.getObjectById(id);

            //Checks if there was a problem
            if (customer == null)
            {
                _logger.LogError("[CustomerController] Customer not found for the orderId {customerId:0000}", id);
                return NotFound("Customer not found for the orderId");
            }

            //Returns View
            return Ok(customer);
        }


        [HttpPost]
        public async Task<IActionResult> Create(Customer customer)
        {
            if (ModelState.IsValid)
            {
                bool ok = await _repository.Create(customer);
                if (ok) return Ok(new { success = true, message = "Customer created"});
            }
            return BadRequest("Customer creation failed");
        }

        [HttpPost]
        public async Task<IActionResult> Update(Customer customer)
        {
            if (ModelState.IsValid)
            {
                bool ok = await _repository.Update(customer);
                if (ok) return Ok(new { success = true, message = "Customer updated" });
            }
            return BadRequest("Customer update failed");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                bool ok = await _repository.Delete(id);
                if (ok) return Ok(new { success = true, message = "Customer deleted" });
            }
            return BadRequest("Customer deletion failed");
        }
    }
}


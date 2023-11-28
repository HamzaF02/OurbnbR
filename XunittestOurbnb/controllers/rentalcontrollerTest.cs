using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using OurbnbR.Controllers;
using OurbnbR.DAL;
using OurbnbR.Models;

namespace XunitTestMyShop.Controllers;

public class ItemControllerTests
{
    [Fact]
    public async Task TestRentalPage()
    {

        // arrange
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        }; 


        var rentalList = new List<Rental>()
        {



        new Rental
            {
            RentalId = 1,
            Name = "House1",
            Description = "Delicious view",
            FromDate = new DateTime(2023, 12, 10),
            ToDate = new DateTime(2023, 12, 12),
            Rating = 3,
            Location = "Oslo",
            Price = 20,
            Image = "/images/LeidHus.jpg",
            OwnerId= 1,
            Owner = Owner
           
            },

            new Rental
            {
            RentalId = 2,
            Name = "House2",
            Description = "house for two",
            FromDate = new DateTime(2023, 12, 11),
            ToDate = new DateTime(2023, 12, 16),
            Rating = 2,
            Location = "Stavanger",
            Price = 25,
            Image = "/images/mc.jpg",
            OwnerId= 1,
            Owner = Owner
          
            }
        };

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);
        mockRentalRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rentalList);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object,mockCustomerRepository.Object , mockLogger.Object);
        
        // act
        var result = await rentalController.GetAll() as OkObjectResult;

        // assert
        var viewResult = Assert.IsType<List<Rental>>(result.Value);
        var itemListViewModel = Assert.IsAssignableFrom<IEnumerable<Rental>>(viewResult);
        Assert.Equal(2, itemListViewModel.Count());
        Assert.Equal(rentalList, itemListViewModel);
       
    }

    [Fact]
    public async Task TestCreateRentalNotOk()
    {
        // arrange

        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        var testItem = new Rental
        {
            RentalId = 1,
            Name = "House1",
            Description = "Delicious view",
            FromDate = new DateTime(2023, 12, 10),
            ToDate = new DateTime(2023, 12, 12),
            Rating = 3,
            Location = "Oslo",
            Price = 20,
            Image = "/images/LeidHus.jpg",
            OwnerId = 1,
            Owner = Owner

        };


        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Create(testItem)).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var itemController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        var result = await itemController.Create(testItem);

        // assert
        var viewResult = Assert.IsType<OkObjectResult>(result);
       
        var viewItem = Assert.IsAssignableFrom<ServerResponse>(viewResult.Value);
        Assert.False(viewItem.success);
    } 


}

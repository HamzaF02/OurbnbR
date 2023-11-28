using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Logging;
using Moq;
using OurbnbR.Controllers;
using OurbnbR.DAL;
using OurbnbR.Models;

namespace XunitTestMyShop.Controllers;

public class RentalControllerTests
{
    [Fact]
    public async Task TestGetAllRentalOK()
    {

        // Arrange objects for testing
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

        //Making mock repositories,logger and setup how they should interact
        var mockRentalRepository = new Mock<IRepository<Rental>>();
        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);
        mockRentalRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rentalList);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object,mockCustomerRepository.Object , mockLogger.Object);

        // Act out the controller function
        var result = await rentalController.GetAll();

        // Assert if response was correct
        var response = Assert.IsType<OkObjectResult>(result);
        var responseList = Assert.IsAssignableFrom<IEnumerable<Rental>>(response.Value);
        Assert.Equal(2, responseList.Count());
        Assert.Equal(rentalList, responseList);
       
    }

    [Fact]
    public async Task TestGetAllRentalNotOK()
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

        mockRentalRepository.Setup(repo => repo.GetAll()).ReturnsAsync((IEnumerable<Rental>?) null);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);

        // act
        var result = await rentalController.GetAll();

        // assert
        var response = Assert.IsType<NotFoundObjectResult>(result);
        var responseValue = Assert.IsAssignableFrom<string>(response.Value);
        Assert.Equal("Rental list not found", responseValue);

    }


    [Fact]
    public async Task TestCreateRentalOk()
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

        var testRental = new Rental
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
        mockRentalRepository.Setup(repo => repo.Create(It.IsAny<Rental>())).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        var result = await rentalController.Create(testRental);

        // assert
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.True(responseValue.success);
    }

    [Fact]
    public async Task TestCreateRentalNotOk()
    {
        //Arrange objects for testing
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        var testRental = new Rental
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


        //Making mock repositories,logger and setup how they should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Create(It.IsAny<Rental>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // Act out the controller function
        var result = await rentalController.Create(testRental);

        // Assert if response was correct
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.False(responseValue.success);
    }


    [Fact]
    public async Task TestDeleteRentalOk()
    {
        // arrange
        int rentalId = 1;

        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Delete(rentalId)).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        var result = await rentalController.Delete(rentalId);

        // assert
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.True(responseValue.success);
    }

    [Fact]
    public async Task TestDeleteRentalNotOk()
    {
        // Arrange value for testing
        int rentalId = 1;

        //Making mock repositories,logger and setup how they should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Delete(rentalId)).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // Act out the controller function
        var result = await rentalController.Delete(rentalId);

        // Assert if response was correct
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.False(responseValue.success);
    }


    [Fact]
    public async Task TestGetObjecByIdRentalOk()
    {
        // Arrange objects for testing
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        var testRental = new Rental
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

        //Making mock repositories,logger and setup how they should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.getObjectById(testRental.RentalId)).ReturnsAsync(testRental);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // Act out the controller function
        var result = await rentalController.GetObjectById(testRental.RentalId);

        // Assert if response was correct
        var response = Assert.IsType<OkObjectResult>(result);
        var responseValue = Assert.IsAssignableFrom<Rental>(response.Value);
        Assert.Equal(responseValue, testRental);
    }

    // test if getobjectbyid fails
    [Fact]
    public async Task TestGetObjecByIdRentalNotOk()
    {
        // Arrange objects for testing
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        var testRental = new Rental
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

        //Making mock repositories and setup for how it should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.getObjectById(testRental.RentalId)).ReturnsAsync((Rental?) null);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // Act out the controller function
        var result = await rentalController.GetObjectById(testRental.RentalId);

        // Assert if response was correct
        var response = Assert.IsType<NotFoundObjectResult>(result);
        var responseValue = Assert.IsAssignableFrom<string>(response.Value);
        Assert.Equal("Rental not found for the RentalId", responseValue);
    }

    // test if update works
    [Fact]
    public async Task TestUpdateRentalOk()
    {
        // Arrange objects for testing
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        var testRental = new Rental
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
            Owner = Owner,
            Orders = null
        };


        //Making mock repositories,logger and setup how they should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Update(It.IsAny<Rental>())).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // Act out the controller function
        var result = await rentalController.Update(testRental);

        // Assert if response was correct
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.True(responseValue.success);
    }


    // test if update fails
    [Fact]
    public async Task TestUpdateRentalNotOk()
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

        var testRental = new Rental
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
            Owner = Owner,
            Orders = null
        };



        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);

        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Update(It.IsAny<Rental>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        var result = await rentalController.Update(testRental);

        // assert
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        Assert.False(responseValue.success);
    }
}

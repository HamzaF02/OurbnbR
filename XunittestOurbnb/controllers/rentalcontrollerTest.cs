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

    // 10 test were made for the rentalcontroller since there are 5 methods (getall, getobjectbyid, create, update, delete)
    // 5 positive and negative test = 10 total test for this table

    [Fact]
    public async Task TestGetAllRentalOK()
    {

        // Arrange objects for testing
        // making a owner of a rental
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        }; 

        // make a list of rentals of a length of two
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

        // we setup get owner and get all rentals 
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);
        mockRentalRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rentalList);

        var mockLogger = new Mock<ILogger<RentalController>>();

        //Creating a controller with mock values
        var rentalController = new RentalController(mockRentalRepository.Object,mockCustomerRepository.Object , mockLogger.Object);

        // Act out the controller function we call to get all the rentals
        var result = await rentalController.GetAll();

        // Assert if response was correct and check if result is ok and will return a true
        var response = Assert.IsType<OkObjectResult>(result);
        var responseList = Assert.IsAssignableFrom<IEnumerable<Rental>>(response.Value);

        // checks if the amount is equal to two
        Assert.Equal(2, responseList.Count());
        //checks if the list of rentals is the same
        Assert.Equal(rentalList, responseList);
       
    }

    [Fact]
    public async Task TestGetAllRentalNotOK()
    {

        // arrange
        // make an owner 
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };

        // make a list of rentals
        var rentalList = new List<Rental>()
        {


        // first rental
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
            // second rental
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

        // we setup get all rentals but it fails and returns null instead
        mockRentalRepository.Setup(repo => repo.GetAll()).ReturnsAsync((IEnumerable<Rental>?) null);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);

        // act
        // we try to get the list of rentals
        var result = await rentalController.GetAll();

        // assert
        // we check if the output is a warning that the list could not be found
        var response = Assert.IsType<NotFoundObjectResult>(result);
        var responseValue = Assert.IsAssignableFrom<string>(response.Value);
        Assert.Equal("Rental list not found", responseValue);

    }


    [Fact]
    public async Task TestCreateRentalOk()
    {
        // arrange
        // make owner
        var Owner = new Customer
        {
            CustomerId = 1,
            FirstName = "Hamza",
            LastName = "Ylli",
            Address = "Oslomet",
            Email = "hei@hotmail.com",
            Phone = 9999999
        };
        //make a rental
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

        // we set up to create rental and it is successful 
        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Create(It.IsAny<Rental>())).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        // we insert testrental into the db
        var result = await rentalController.Create(testRental);

        // assert
        // we get a response which is ok
        var response = Assert.IsType<OkObjectResult>(result);
        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);

        // we check if the value is true/success in db
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
        // check if the value was false 
        Assert.False(responseValue.success);
    }


    [Fact]
    public async Task TestDeleteRentalOk()
    {
        // arrange
        // try to delete rental with rentalid 1 and get success
        int rentalId = 1;

        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Delete(rentalId)).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);



        // act
        // we insert rentalid into the delete method
        var result = await rentalController.Delete(rentalId);

        // assert
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        // checks if the delete method was successful
        Assert.True(responseValue.success);
    }

    [Fact]
    public async Task TestDeleteRentalNotOk()
    {
        // Arrange value for testing
        int rentalId = 1;

        //Making mock repositories,logger and setup how they should interact and is not successful
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
        // checks if value is false/ deleting was not successful
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
        // checks if rental if is not found
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
        //checks if is successful to update
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


        //Making mock repositories,logger and setup how they should interact
        var mockCustomerRepository = new Mock<IRepository<Customer>>();
        mockCustomerRepository.Setup(repo => repo.getObjectById(Owner.CustomerId)).ReturnsAsync(Owner);

        // fails to update and returns false
        var mockRentalRepository = new Mock<IRepository<Rental>>();
        mockRentalRepository.Setup(repo => repo.Update(It.IsAny<Rental>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<RentalController>>();
        var rentalController = new RentalController(mockRentalRepository.Object, mockCustomerRepository.Object, mockLogger.Object);

        // act
        var result = await rentalController.Update(testRental);

        // assert
        var response = Assert.IsType<OkObjectResult>(result);

        var responseValue = Assert.IsAssignableFrom<ServerResponse>(response.Value);
        // checks if it was not successful in updating
        Assert.False(responseValue.success);
    }
}

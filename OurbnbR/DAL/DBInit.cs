using System;
using Microsoft.EntityFrameworkCore;
using OurbnbR.Models;

namespace OurbnbR.DAL
{
	public class DBInit
	{
		public static void Seed(IApplicationBuilder app)
		{
            using var serviceScope = app.ApplicationServices.CreateScope();
            RentalDbContext context = serviceScope.ServiceProvider.GetRequiredService<RentalDbContext>();
            //Creates and delets database content
           //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();


            //checks if there is not any customers
            if (!context.Customers.Any())
            {
                //adds customers to the database
                var customer = new List<Customer>
                {
                    new Customer
                    {
                        FirstName="Hamza",
                        LastName="Ylli",
                        Address="Pilestreden 32",
                        Phone=91824521,
                        Email="Harki@gmail.com"


                    },
                   
                       

                    new Customer
                    {
                        FirstName="Mahdi",
                        LastName="Ibbi",
                        Address="Pilestredet 35",
                        Phone=47782356,
                        Email="Oslo@gmail.com"
                    }


                };
                //saves the customers in the database
                context.AddRange(customer);
                context.SaveChanges();
            }

            //checks if there are not any rentals
            if (!context.Rentals.Any())
            {
                var rentals = new List<Rental>
                {
                    //create new rentals
                    new Rental
                    {
                        Name="Hytte i Nordkapp",
                        Location="Nordkapp",
                        Description="Fin moderne hytte med mye plass",
                        Price=2500,
                        OwnerId=1,
                        FromDate=new DateTime(2023, 10, 27),
                        ToDate=new DateTime(2023, 11, 30),
                        Image = "/images/hytteNordkapp.jpg",
                        Rating=3
                    },
                    new Rental
                    {
                        Name = "House by the waterfalls",
                        Description = "A nice place to be with friends and family to enjoy a calm and nice view",
                        FromDate = new DateTime(2023, 10, 10),
                        ToDate = new DateTime(2024, 10, 10),
                        Rating = 3,
                        Location = "Gran",
                        Price = 150,
                        Image = "/images/HouseWater.jpeg",
                        OwnerId = 2
                    },
                    new Rental
                    {
                        Name = "House by the forrest",
                        Description = "A nice place to be with friends and family to enjoy a calm and nice view",
                        FromDate = new DateTime(2023, 04, 10),
                        ToDate = new DateTime(2023, 04, 20),
                        Rating = 3.9,
                        Location = "Tomter",
                        Price = 150,
                        Image = "/images/modernhouse.jpg",
                        OwnerId = 1
                    },
                    new Rental
                    {
                        Name = "House by the mountains",
                        Description = "A nice place to be with friends and family to enjoy a calm and nice view",
                        FromDate = new DateTime(2023, 08, 10),
                        ToDate = new DateTime(2024, 08, 10),
                        Rating = 4.1,
                        Location = "Hafjell",
                        Price = 150,
                        Image = "/images/mountain.jpeg",
                        OwnerId = 2
                    }
                };
                //saves the rentals to the database
                context.AddRange(rentals);
                context.SaveChanges();
            }

            //checks if the database contains any orders
            if (!context.Orders.Any())
            {
                //creates a new order
                var orders = new List<Order>
                {
                    new Order
                    {
                        CustomerId = 1,
                        RentalId = 1,
                        From = new DateTime(2023, 10, 21),
                        To = new DateTime(2023, 10, 30),
                        Rating = 3,
                        TotalPrice = 22500,
                    },
                    new Order
                    {
                        CustomerId = 1,
                        RentalId = 3,
                        From = new DateTime(2023, 10, 19),
                        To = new DateTime(2023, 10, 20),
                        Rating = 5,
                        TotalPrice = 150,
                    }
            };
                //saves the order in the database
                context.AddRange(orders);
                context.SaveChanges();
            }
			
        }
	}
}

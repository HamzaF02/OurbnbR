using Microsoft.EntityFrameworkCore;
using System;
using OurbnbR.Models;
namespace OurbnbR.DAL
{
	public class RentalDbContext : DbContext
	{
		// dbcontext initilizes rental, customers and orders
		public RentalDbContext(DbContextOptions<RentalDbContext> options) : base(options)
		{
			//Database.EnsureCreated();
		}
		public DbSet<Rental> Rentals { get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Order> Orders { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseLazyLoadingProxies();
		}
	}
}


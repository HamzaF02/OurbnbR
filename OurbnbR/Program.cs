using Microsoft.EntityFrameworkCore;
using Ourbnb.DAL;
using Ourbnb.Models;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddControllers().AddNewtonsoftJson( options =>{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

});

builder.Services.AddDbContext<RentalDbContext>(options =>
{
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:RentalDbContextConnection"]);

});

builder.Services.AddScoped<IRepository<Rental>, RentalRepository>();
builder.Services.AddScoped<IRepository<Customer>, CustomerRepository>();
builder.Services.AddScoped<IRepository<Order>, OrderRepository>();

var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information() // levels: Trace< Information < Warning < Erorr < Fatal
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                            e.Level == LogEventLevel.Information &&
                            e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    DBInit.Seed(app);
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();

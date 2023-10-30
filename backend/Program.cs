using Autofac;
using Autofac.Extensions.DependencyInjection;
using juztTest_backend;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
	.ConfigureContainer<ContainerBuilder>(x=>x.RegisterModule(new AutofacModule()));

builder.Services.AddControllers();

var app = builder.Build();

// app.UseAuthorization();

app.MapControllers();

app.UseCors(b =>
{
	// b.AllowAnyOrigin();
	b.WithOrigins("http://localhost:3000");
	b.AllowAnyMethod();
	b.AllowCredentials();
	b.AllowAnyHeader();
});

// var db = app.Services.CreateScope().ServiceProvider.GetRequiredService<PostgresContext>();
// db.Cars.Add(new Car
// {
// 	
// })

app.Run();
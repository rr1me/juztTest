using Autofac;
using Autofac.Extensions.DependencyInjection;
using juztTest_backend;
using juztTest_backend.Data;
using juztTest_backend.Db;
using juztTest_backend.Middlewares;
using Microsoft.AspNetCore.Localization;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
	.ConfigureContainer<ContainerBuilder>(x => x.RegisterModule(new AutofacModule()));

builder.Services.AddControllers();

builder.Services.AddAuthentication().AddScheme<AuthScheme, AuthMiddleware>("AuthScheme", null);

var app = builder.Build();

app.UseRequestLocalization(new RequestLocalizationOptions
{
	DefaultRequestCulture = new RequestCulture("en-US")
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors(b =>
{
	b.WithOrigins(app.Configuration.GetSection("corsOrigin").Value);
	b.AllowAnyMethod();
	b.AllowCredentials();
	b.AllowAnyHeader();
});

var db = app.Services.GetAutofacRoot().Resolve<PostgresContext>();
db.Database.EnsureCreated();
if (!db.Users.Any())
{
	db.Users.Add(new User
	{
		Username = "user",
		Password = BCrypt.Net.BCrypt.HashPassword("123456")
	});
}
db.SaveChanges();
db.Dispose();

app.Run();
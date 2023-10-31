using System.Security.Cryptography;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using juztTest_backend;
using juztTest_backend.Db;
using juztTest_backend.Middlewares;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
	.ConfigureContainer<ContainerBuilder>(x => x.RegisterModule(new AutofacModule()));

builder.Services.AddControllers();

builder.Services.AddAuthentication().AddScheme<AuthScheme, AuthMiddleware>("AuthScheme", null);

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors(b =>
{
	b.WithOrigins("http://localhost:3000");
	b.AllowAnyMethod();
	b.AllowCredentials();
	b.AllowAnyHeader();
});

var db = app.Services.GetAutofacRoot().Resolve<PostgresContext>();
db.Database.EnsureCreated();

// var user = new User
// {
// 	Username = "user",
// 	Password = BCrypt.Net.BCrypt.HashPassword("123456")
// };
//
// db.Users.Add(user);
//

db.SaveChanges();
db.Dispose();

// var publicRsa = RSA.Create();
// File.WriteAllText("publicKey.pem", publicRsa.ExportRSAPublicKeyPem());
// File.WriteAllText("privateKey.pem", publicRsa.ExportRSAPrivateKeyPem());

app.Run();
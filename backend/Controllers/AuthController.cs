using System.Security.Cryptography;
using juztTest_backend.Data;
using juztTest_backend.Db;
using juztTest_backend.JWT;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace juztTest_backend.Controllers;

[Route("auth")]
public class AuthController(PostgresContext db, JwtOrchestrator jwtOrchestrator) : ControllerBase
{
	[HttpGet]
	[Authorize]
	public IActionResult Verify()
	{
		return Ok();
	}

	[HttpPost("login")]
	public IActionResult Login([FromBody] User userCredentials)
	{
		var user = db.Users.FirstOrDefault(x => x.Username == userCredentials.Username);

		if (user == null || !VerifyPass(userCredentials.Password, user.Password)) 
			return BadRequest("Wrong username or password");

		var encoded = jwtOrchestrator.EncodeJwt(user.Username);
		
		var options = new CookieOptions
		{
			SameSite = SameSiteMode.Strict,
			Expires = DateTimeOffset.FromUnixTimeSeconds(encoded.Expiration),
			HttpOnly = true,
		};
		
		HttpContext.Response.Cookies.Append("auth", encoded.Token, options);
		
		return Ok();
	}
	
	private bool VerifyPass(string hash, string password) => BCrypt.Net.BCrypt.Verify(hash, password);
}
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using juztTest_backend.JWT;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace juztTest_backend.Middlewares;

public class AuthScheme : AuthenticationSchemeOptions;

public class AuthMiddleware(IOptionsMonitor<AuthScheme> options, ILoggerFactory logger, UrlEncoder encoder,
		JwtOrchestrator jwtOrchestrator)
	: AuthenticationHandler<AuthScheme>(options, logger, encoder)
{
	protected override Task<AuthenticateResult> HandleAuthenticateAsync()
	{
		var jwt = Request.Cookies.FirstOrDefault(x => x.Key == "auth").Value;

		if (jwt == null) return Task.FromResult(AuthenticateResult.Fail("No JWT or its invalid token"));
		
		IDictionary<string, object> payload;
		try
		{
			payload = jwtOrchestrator.DecodeJwt(jwt);
		}
		catch (Exception e)
		{
			var log = logger.CreateLogger<AuthMiddleware>();
			log.LogWarning("Decode exception: " + e.Message);
			return Task.FromResult(AuthenticateResult.Fail("No JWT or its invalid token"));
		}
		
		var claims = new[]
		{
			new Claim(ClaimTypes.UserData, payload["username"].ToString())
		};
		var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, "AuthScheme"));

		return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
	}
}
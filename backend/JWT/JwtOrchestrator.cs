using System.Security.Cryptography;
using JWT.Algorithms;
using JWT.Builder;

namespace juztTest_backend.JWT;

public class JwtOrchestrator
{
	private readonly RS256Algorithm _algorithm;
	
	public JwtOrchestrator()
	{
		var publicRsa = RSA.Create();
		var publicKey = File.ReadAllText("publicKey.pem");
		publicRsa.ImportFromPem(publicKey);

		var privateRsa = RSA.Create();
		var privateKey = File.ReadAllText("privateKey.pem");
		privateRsa.ImportFromPem(privateKey);

		_algorithm = new RS256Algorithm(publicRsa, privateRsa);
	}

	public IDictionary<string, object> DecodeJwt(string token)
	{
		var jwtDecoder = JwtBuilder.Create().WithAlgorithm(_algorithm).MustVerifySignature();
		return jwtDecoder.Decode<IDictionary<string, object>>(token);
	}

	public EncodingResult EncodeJwt(string username)
	{
		var expiration = DateTimeOffset.UtcNow.AddDays(7).ToUnixTimeSeconds();
		var jwt = JwtBuilder.Create().WithAlgorithm(_algorithm)
			.AddClaim("exp", expiration)
			.AddClaim("username", username)
			.MustVerifySignature()
			.Encode();

		return new EncodingResult(jwt, expiration);
	}
}

public class EncodingResult(string token, long expiration)
{
	public string Token { get; } = token;
	public long Expiration { get; } = expiration;
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace juztTest_backend.Data;

public class User
{
	[Key]
	[JsonIgnore]
	public int Id { get; set; }
	
	public string Username { get; set; }
	public string Password { get; set; }
}
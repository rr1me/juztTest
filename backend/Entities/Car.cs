using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace juztTest_backend.Data;

public class Car
{
	[Key]
	[JsonIgnore]
	public int Id { get; set; }
	
	
	[NotMapped]
	public IFormFile Image { get; set; }
	
	public string Brand { get; set; }
	public string Model { get; set; }
	public ColorFilter Color { get; set; }
	public string Price { get; set; }
	public int Year { get; set; }
	public EngineType Engine { get; set; }
	public Transmission Transmission { get; set; }
	public double CruisingRange { get; set; }
}

public enum EngineType
{
	Gasoline,
	Diesel,
	Electrical
}

public enum Transmission
{
	Auto,
	Manual,
	Robotic
}

public enum Sorting
{
	Unset,
	Up,
	Down
}

public enum ColorFilter
{
	Unset,
	White,
	Gray,
	Black,
	Blue,
	Silver,
	Brown,
	Red,
	Green,
	Beige,
	Orange,
	Cyan,
	Yellow,
	Other
}
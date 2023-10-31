using System.ComponentModel.DataAnnotations;

namespace juztTest_backend.Data;

public class Car
{
	[Key]
	public int Id { get; set; }
	public string Image { get; set; }
	public string Brand { get; set; }
	public string Model { get; set; }
	public string Color { get; set; }
	public double Price { get; set; }
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
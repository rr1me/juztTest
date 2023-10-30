using System.Collections;
using juztTest_backend.Data;
using juztTest_backend.Db;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace juztTest_backend.Controllers;

public class MainController : ControllerBase
{
	private readonly PostgresContext _db;
	private readonly TestClass _testClass;

	public MainController(PostgresContext db, TestClass testClass)
	{
		_db = db;
		_testClass = testClass;
	}

	[HttpGet("/check")]
	public string Check()
	{
		_db.Database.EnsureCreated();
		_db.Cars.Add(new Car
		{
			Image = "0",
			Brand = "any",
			Model = "any",
			Color = "any",
			Price = 5.5,
			Year = 2022,
			Engine = EngineType.Gasoline,
			Transmission = Transmission.Auto,
			CruisingRange = 9.9
		});
		_db.SaveChanges();

		Console.WriteLine("hello there");
		return "Hello";
	}

	[HttpGet("/")]
	public IActionResult Get(int limit, int offset, 
		Sorting yearSorting, Sorting priceSorting,
		string brandFilter, ColorFilter colorFilter)
	{
		try
		{
			var carList = _db.Cars.ToList();

			var carCount = carList.Count;

			var processedLimit = limit;

			if (limit == 0 || limit + offset > carCount)
			{
				processedLimit = carCount - offset;
			}
			
			if (yearSorting != Sorting.Unset)
			{
				Comparison<Car> predicate = yearSorting == Sorting.Up ? 
					(a, b) => a.Year - b.Year 
					: 
					(a, b) => b.Year - a.Year;
				carList.Sort(predicate);
			}
			
			if (priceSorting != Sorting.Unset)
			{
				if (priceSorting == Sorting.Up)
					carList = carList.OrderBy(x => x.Price).ToList();
				else
					carList = carList.OrderByDescending(x => x.Price).ToList();
			}
			
			IEnumerable slicedList = carList.Slice(offset, processedLimit);

			if (!string.IsNullOrEmpty(brandFilter))
				slicedList = (slicedList as List<Car>).ToArray().Where(x => x.Brand.Contains(brandFilter));

			if (colorFilter != ColorFilter.Unset)
			{
				Console.WriteLine(colorFilter);
			}
			
			return Ok(slicedList);
		}
		catch (Exception _)
		{
			return StatusCode(412, "Out of bound or argument exception");
		}
	}

	[HttpGet("/image")]
	public IActionResult GetImage()
	{
		return File(System.IO.File.ReadAllBytes("./tbrender_006.png"), "image/png");
	}

	[HttpPost("/up")]
	public IActionResult Post([FromForm] IFormFile file)
	{
		if (file.Length > 50 * 1024 * 1024)
			return BadRequest("Image is too large");

		return Ok("ok");
	}
}

// public enum Sorting
// {
// 	Year,
// 	Price
// }

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
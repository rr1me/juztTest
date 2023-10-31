using System.Collections;
using juztTest_backend.Data;
using juztTest_backend.Db;
using Microsoft.AspNetCore.Mvc;

namespace juztTest_backend.Controllers;

public class MainController(PostgresContext db) : ControllerBase
{
	[HttpGet("/")]
	public IActionResult Get(int limit, int offset, 
		Sorting yearSorting, Sorting priceSorting,
		string brandFilter, ColorFilter colorFilter)
	{
		try
		{
			var carList = db.Cars.ToList();

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

	[HttpGet("/car/{id}")]
	public IActionResult GetParticular(int id)
	{
		var car = db.Cars.FirstOrDefault(x => x.Id == id);

		if (car == null) return BadRequest("No car with that id");

		return Ok(car);
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
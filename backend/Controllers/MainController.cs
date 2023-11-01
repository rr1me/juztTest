using juztTest_backend.Data;
using juztTest_backend.Db;
using Microsoft.AspNetCore.Authorization;
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
			
			if (yearSorting != Sorting.Unset && priceSorting == Sorting.Unset)
			{
				Comparison<Car> predicate = yearSorting == Sorting.Up
					? (a, b) => a.Year - b.Year
					: (a, b) => b.Year - a.Year;
				carList.Sort(predicate);
			} 
			else if (priceSorting != Sorting.Unset && yearSorting == Sorting.Unset)
			{
				Comparison<Car> predicate = priceSorting == Sorting.Up
					? (a, b) => Convert.ToDouble(a.Price).CompareTo(Convert.ToDouble(b.Price))
					: (a, b) => Convert.ToDouble(b.Price).CompareTo(Convert.ToDouble(a.Price));
				
					carList.Sort(predicate);
			}
			else if (yearSorting != Sorting.Unset && priceSorting != Sorting.Unset)
			{
				var buffer = priceSorting == Sorting.Up
					? carList.OrderBy(c => Convert.ToDouble(c.Price))
					: carList.OrderByDescending(c => Convert.ToDouble(c.Price));

				buffer = yearSorting == Sorting.Up ? buffer.ThenBy(c => c.Year) : buffer.ThenByDescending(c => c.Year);

				carList = buffer.ToList();
			}

			if (!string.IsNullOrEmpty(brandFilter))
				carList = carList.Where(x => x.Brand.Contains(brandFilter, StringComparison.CurrentCultureIgnoreCase)).ToList();

			if (colorFilter != ColorFilter.Unset)
			{
				carList = carList.ToArray().Where(x => x.Color == colorFilter).ToList();
			}
			
			var carCount = carList.Count;

			var processedLimit = limit;

			if (limit == 0 || limit + offset > carCount)
			{
				processedLimit = carCount - offset;
			}
			
			var slicedList = carList.Slice(offset, processedLimit).ToList();
			
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

	[HttpPut("/")]
	[Authorize]
	public async Task<IActionResult> Put([FromForm] Car car)
	{
		var i = db.Cars.Add(car);
		await db.SaveChangesAsync();

		Directory.CreateDirectory("./images");

		var carImage = car.Image;
		await using (var stream = new FileStream($"./images/{car.Id}{Path.GetExtension(carImage.FileName)}", FileMode.Create))
		{
			await carImage.CopyToAsync(stream);
		}

		return Ok("");
	}

	[HttpGet("/image/{id}")]
	public IActionResult GetImage(int id)
	{
		var matchingFile = Directory.GetFiles("./images", $"{id}.*")[0];

		var extension = Path.GetExtension(matchingFile);
		return File(System.IO.File.ReadAllBytes($"./images/{id}{extension}"), GetMimeType(extension));
	}

	[HttpPost("/up")]
	public IActionResult Post([FromForm] IFormFile file)
	{
		if (file.ContentType is not ("image/png" or "image/jpeg"))
			return BadRequest("Not an image");
		
		if (file.Length > 50 * 1024 * 1024)
			return BadRequest("Image is too large");

		return Ok("ok");
	}
	
	private string GetMimeType(string fileExtension)
	{
		var mimeTypes = new Dictionary<string, string>
		{
			{ ".jpg", "image/jpeg" },
			{ ".jpeg", "image/jpeg" },
			{ ".png", "image/png" },
			{ ".gif", "image/gif" },
			{ ".pdf", "application/pdf" },
		};

		return mimeTypes.TryGetValue(fileExtension, out var contentType) ? contentType : "application/octet-stream";
	}
}
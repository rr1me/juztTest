using juztTest_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace juztTest_backend.Db;

public class PostgresContext(IConfiguration config) : DbContext
{
	public DbSet<Car> Cars { get; set; }
	public DbSet<User> Users { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseNpgsql(config.GetSection("connectionString").Value);
	}
}
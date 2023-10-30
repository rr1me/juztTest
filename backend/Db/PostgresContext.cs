﻿using juztTest_backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace juztTest_backend.Db;

public class PostgresContext : DbContext
{
	public DbSet<Car> Cars { get; set; }

	public readonly Guid guid;

	public PostgresContext()
	{
		guid = Guid.NewGuid();
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=\"juztTest\";Username=postgres;Password=123");
	}
}
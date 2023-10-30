using Autofac.Features.OwnedInstances;

namespace juztTest_backend.Db;

public class TestClass(Func<Owned<PostgresContext>> postgresContextFactory)
{
	private readonly Guid Guid = Guid.NewGuid();

	public void Do()
	{
		using var wrappedDb = postgresContextFactory();
		var db = wrappedDb.Value;
		
		Console.WriteLine("class: " + Guid);
		Console.WriteLine("classDb: " + db.guid);
	}
}
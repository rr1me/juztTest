using Autofac;
using juztTest_backend.Db;
using juztTest_backend.JWT;

namespace juztTest_backend;

public class AutofacModule : Module
{
	protected override void Load(ContainerBuilder builder)
	{
		builder.RegisterType<PostgresContext>().InstancePerLifetimeScope();
		builder.RegisterType<JwtOrchestrator>().SingleInstance();
	}
}
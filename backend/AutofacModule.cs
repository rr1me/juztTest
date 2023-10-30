using Autofac;
using Autofac.Extensions.DependencyInjection;
using juztTest_backend.Db;
using Microsoft.EntityFrameworkCore;

namespace juztTest_backend;

public class AutofacModule : Module
{
	protected override void Load(ContainerBuilder builder)
	{
		builder.RegisterType<PostgresContext>().InstancePerLifetimeScope();
		builder.RegisterType<TestClass>().SingleInstance();
	}
}
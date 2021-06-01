using Application;
using Application.RequestPipeline;
using Carvana.Mediator;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace WebApi
{
    public static class DependencyRegistration
    {
        public static void RegisterAllDependencies(this IServiceCollection s, IConfiguration config)
        {
            Mediator(s);
        }
        
        private static void Mediator(IServiceCollection s)
        {
            s.AddScoped<IRequestHandler>(x => x.GetRequiredService<IMediator>());
            s.AddScoped<IPipeBehavior, WithLoggedRequestResponse>();
            s.AddScoped<IServices, ServiceCollectionAsServices>();
            s.AddScoped<Registrar>();
            s.AddScoped<UseCases>();
            s.AddScoped(x => x.GetRequiredService<UseCases>().RegisterUseCases());
        }
    }
}
using Application.RequestPipeline;
using Carvana.Mediator;

namespace Application
{
    public sealed class UseCases
    {
        private readonly Registrar _reg;

        public UseCases(Registrar registrar) => _reg = registrar;

        public IMediator RegisterUseCases()
        {

            return _reg.Mediator;
        }
    }
}
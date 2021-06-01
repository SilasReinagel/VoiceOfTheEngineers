using System;
using System.Threading.Tasks;
using Carvana.Mediator;

namespace WebApi.Template.Adapters
{
    public sealed class WithLoggingOnError : IEventHandler
    {
        private readonly ILog _log = Log.ForContext<IEventHandler>();
        private readonly IEventHandler _inner;

        public WithLoggingOnError(IEventHandler inner) => _inner = inner;

        public async Task Publish<TEvent>(TEvent eventMessage)
        {
            try
            {
                await _inner.Publish(eventMessage);
            }
            catch (Exception e)
            {
                _log.Error(e, $"Unable to publish Event '{typeof(TEvent).Name}'");
            }
        }
    }
}
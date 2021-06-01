using System;
using System.Threading.Tasks;
using Carvana;
using Carvana.Mediator;

namespace Application.RequestPipeline
{
    public interface IServices
    {
        T Resolve<T>();
    }
    
    public class Registrar
    {
        private readonly IPipeBehavior _requestPipeline;
        private readonly IServices _services;
        public readonly IMediator Mediator;
        
        public Registrar(IPipeBehavior defaultRequestHandlerBehaviors, IServices services)
        {
            _requestPipeline = defaultRequestHandlerBehaviors
                .PipeTo(new CatchUnhandledExceptions<Exception>(ex => Result.Errored(ResultStatus.ProcessingError, $"Unexpected internal processing error: {ex.ToString()}")))
                .PipeTo(new CatchUnhandledExceptions<TimeoutException>(ex => Result.Errored(ResultStatus.DependencyFailure, $"Unexpected external timeout: {ex.ToString()}")))
                .PipeTo(new CatchUnhandledExceptions<TaskCanceledException>(ex => Result.Errored(ResultStatus.DependencyFailure, $"Unexpected external timeout: {ex.ToString()}")))
                .PipeTo(new ValidateRequestBehavior());
            _services = services;
            Mediator = new InMemoryMediator();
        }
        
        public void UseCase<THandler, TRequest>(Func<THandler, Func<TRequest, Task<Result>>> getHandler)
            where THandler : class
        {
            Handle<TRequest>(async req => await getHandler(_services.Resolve<THandler>())(req));
        }

        public void UseCase<THandler, TRequest, TResponse>(Func<THandler, Func<TRequest, Task<Result<TResponse>>>> getHandler)
            where THandler : class
        {
            Handle<TRequest, TResponse>(async req => await getHandler(_services.Resolve<THandler>())(req));
        }
        
        private void Handle<TRequest>(Func<TRequest, Task<Result>> getResponse)
        {
            Mediator.Register<TRequest, Result>(req => _requestPipeline.Handle(req, getResponse));
        }

        private void Handle<TRequest, TResponse>(Func<TRequest, Task<Result<TResponse>>> getResponse)
        {
            Mediator.Register<TRequest, Result<TResponse>>(req => _requestPipeline.Handle(req, getResponse));
        }
    }
}
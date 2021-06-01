using System;
using System.Threading.Tasks;
using Carvana;

namespace Application.RequestPipeline
{
    public interface IPipeBehavior
    {
        Task<Result> Handle<TRequest>(TRequest req, Func<TRequest, Task<Result>> getResult);

        Task<Result<TResponse>> Handle<TRequest, TResponse>(TRequest req,
            Func<TRequest, Task<Result<TResponse>>> getResponse);
    }

    public static class PipeExtensions
    {
        public static IPipeBehavior PipeTo(this IPipeBehavior first, IPipeBehavior second)
        {
            return new Piped(first, second);
        }
    }
}
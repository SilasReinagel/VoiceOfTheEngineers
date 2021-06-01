using System;
using System.Threading.Tasks;
using Carvana;

namespace Application.RequestPipeline
{
    public sealed class CatchUnhandledExceptions<TException> : IPipeBehavior where TException : Exception
    {
        private readonly Func<Exception, Result> _getExceptionResult;

        public CatchUnhandledExceptions(Func<Exception, Result> getExceptionResult)
        {
            _getExceptionResult = getExceptionResult;
        }

        public async Task<Result> Handle<TRequest>(TRequest req, Func<TRequest, Task<Result>> getResult)
        {
            try
            {
                return await getResult(req);
            }
            catch (TException e)
            {
                return _getExceptionResult(e);
            }
        }

        public async Task<Result<TResponse>> Handle<TRequest, TResponse>(TRequest req, Func<TRequest, Task<Result<TResponse>>> getResponse)
        {
            try
            {
                return await getResponse(req);
            }
            catch (TException e)
            {
                return _getExceptionResult(e).AsTypedError<TResponse>();
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carvana;

namespace Application.RequestPipeline
{
    public sealed class Piped : IPipeBehavior
    {
        private readonly List<IPipeBehavior> _behaviors;

        public Piped(params IPipeBehavior[] behaviors)
        {
            _behaviors = behaviors.Reverse().ToList();
        }

        public async Task<Result> Handle<TRequest>(TRequest req, Func<TRequest, Task<Result>> getResult)
        {
            var composedFunction = getResult;
            foreach (var b in _behaviors)
            {
                var currentFunction = composedFunction;
                composedFunction = r => b.Handle(r, currentFunction);
            }

            var resp = await composedFunction(req);
            return resp;
        }

        public async Task<Result<TResponse>> Handle<TRequest, TResponse>(TRequest req, Func<TRequest, Task<Result<TResponse>>> getResponse)
        {
            var composedFunction = getResponse;
            foreach (var b in _behaviors)
            {
                var currentFunction = composedFunction;
                composedFunction = r => b.Handle(r, currentFunction);
            }

            var resp = await composedFunction(req);
            return resp;
        }
    }
}
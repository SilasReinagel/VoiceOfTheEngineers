using System.Threading.Tasks;
using Carvana;
using Carvana.Mediator;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Template.Adapters
{
    public static class ResultResponseExtensions
    {
        public static async Task<IActionResult> Handle<TRequest>(this IRequestHandler requests, TRequest request)
        {
            return await requests.Handle<TRequest, Result>(request).AsResponse();
        }
        
        
        public static IActionResult AsResponse(this Result result)
        {
            return new ObjectResult(result) { StatusCode = (int)result.Status };
        }

        public static async Task<IActionResult> AsResponse(this Task<Result> result)
        {
            var completedResult = await result;
            return new ObjectResult(completedResult) { StatusCode = (int)completedResult.Status };
        }
    }
}
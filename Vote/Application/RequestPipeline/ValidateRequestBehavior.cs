using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Carvana;

namespace Application.RequestPipeline
{
    public sealed class ValidateRequestBehavior : IPipeBehavior
    {
        public async Task<Result> Handle<TRequest>(TRequest req, Func<TRequest, Task<Result>> getResult)
        {
            var validationResult = Validate(req);
            var result = validationResult.IsValid
                ? await getResult(req)
                : Result.InvalidRequest(validationResult.IssuesMessage);
            return result;
        }

        public async Task<Result<TResponse>> Handle<TRequest, TResponse>(TRequest req, Func<TRequest, Task<Result<TResponse>>> getResponse)
        {
            var validationResult = Validate(req);
            var result = validationResult.IsValid
                ? await getResponse(req)
                : Result<TResponse>.InvalidRequest(validationResult.IssuesMessage);
            return result;
        }

        private ValidationResult Validate<TRequest>(TRequest req)
        {
            return req == null
                ? new ValidationResult("Incoming Request is null. Fix your request format and try again.")
                : GetValidatable(req).Validate();
        }

        private IValidate GetValidatable<TRequest>(TRequest req)
        {
            if (req == null)
                return new FailValidationBecauseNull();
            
            return typeof(IValidate).IsAssignableFrom(typeof(TRequest))
                ? (IValidate)req
                : new Validatable<object>(req, new ValidationRules());
        }

        private class FailValidationBecauseNull : IValidate
        {
            public ValidationResult Validate() => new ValidationResult("Validated object is null");
        }
    }
}
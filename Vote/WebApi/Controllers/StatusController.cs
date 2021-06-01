using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : Controller
    {
        private readonly ILogger _logger;

        public StatusController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(GetType());
        }
        
        [HttpGet, Route("")]
        [SwaggerSuccessExample(typeof(AppStatus), nameof(AppStatus.Example))]
        [ProducesResponseType(typeof(AppStatus), (int)HttpStatusCode.OK)]
        public IActionResult Get()
        {
            return Ok(AppStatus.Current());
        }

        [HttpPost, Route("log")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult LogTest()
        {
            _logger.LogInformation("Hello, World");
            return Ok();
        }

        [Authorize]
        [HttpGet, Route("authorized")]
        [SwaggerSuccessExample(typeof(AppStatus), nameof(AppStatus.Example))]
        [ProducesResponseType(typeof(AppStatus), (int)HttpStatusCode.OK)]
        public IActionResult GetAuthorized()
        {
            return Ok(AppStatus.Current());
        }
        
        [HttpGet, Route("health")]
        [SwaggerSuccessExample(typeof(AppHealthDetailsResponse), nameof(AppHealthDetailsResponse.GetExample))]
        [ProducesResponseType(typeof(AppHealthDetailsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetHealth([FromServices]IAppHealth appHealth)
        {
            var health = await appHealth.Get();
            var statusCode = health.OverallHealth.Equals(HealthStatus.Healthy) ? HttpStatusCode.OK : HttpStatusCode.ServiceUnavailable;
            return new ObjectResult(new AppHealthDetailsResponse(health)) { StatusCode = (int) statusCode }; 
        }
    }
}
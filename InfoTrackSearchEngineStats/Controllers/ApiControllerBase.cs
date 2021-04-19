using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace InfoTrackSearchEngineStats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        private ISender _mediator;
        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();

        public async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            return await Mediator.Send(request);
        }
    }
}
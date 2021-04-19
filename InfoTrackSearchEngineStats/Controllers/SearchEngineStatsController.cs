using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Search.Model;
using Application.Search.Query;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InfoTrackSearchEngineStats.Controllers
{
    [ApiController]
    public class SearchEngineStatsController : ApiControllerBase
    {
        private readonly ILogger<SearchEngineStatsController> _logger;

        public SearchEngineStatsController(ILogger<SearchEngineStatsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/search/google")]
        public async Task<ActionResult<SearchEngineResultsDto>> GoogleStats(string searchString, string searchAddress)
        {
            var result = await SendAsync(new GetSearchResultsQuery(SearchEngine.Google, searchString, searchAddress));
            return Ok(result);
        }
        
        [HttpGet("/search/bing")]
        public async Task<ActionResult<SearchEngineResultsDto>> BingStats(string searchString, string searchAddress)
        {
            var result = await SendAsync(new GetSearchResultsQuery(SearchEngine.Bing, searchString, searchAddress));
            return Ok(result);
        }
    }
}
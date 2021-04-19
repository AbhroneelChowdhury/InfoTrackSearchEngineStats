using System.Threading;
using System.Threading.Tasks;
using Application.Search.Model;
using Application.Services;
using MediatR;

namespace Application.Search.Query
{
    public class GetSearchResultsQueryHandler :IRequestHandler<GetSearchResultsQuery, SearchEngineResultsDto>
    {
        private readonly ISearchService _searchService;

        public GetSearchResultsQueryHandler(ISearchService searchService)
        {
            _searchService = searchService;
        }

        public Task<SearchEngineResultsDto> Handle(GetSearchResultsQuery request, CancellationToken cancellationToken)
        {
            var result = request.SearchEngine switch
            {
                SearchEngine.Bing => _searchService.PerformBingSearch(request),
                _ => _searchService.PerformGoogleSearch(request)
            };
            return Task.FromResult(result);
        }
    }
}
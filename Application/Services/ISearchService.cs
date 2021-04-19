using Application.Search.Model;
using Application.Search.Query;

namespace Application.Services
{
    public interface ISearchService
    {
        SearchEngineResultsDto PerformGoogleSearch(GetSearchResultsQuery request);
        
        SearchEngineResultsDto PerformBingSearch(GetSearchResultsQuery request);
    }
}
using Application.Search.Model;
using MediatR;

namespace Application.Search.Query
{
    public record GetSearchResultsQuery(SearchEngine SearchEngine ,string SearchString, string Address) : IRequest<SearchEngineResultsDto>;
}
using System.Collections.Generic;
using System.Linq;
using Application.Search.Model;
using Application.Search.Query;
using Application.Services;
using HtmlAgilityPack;

namespace BusinessLogic.ServiceImplementations
{
    public class SearchService : ISearchService
    {
        private readonly HtmlWeb _webHtmlExtractor;
        private const int MaxPosition = 50;

        public SearchService(HtmlWeb webHtmlExtractor)
        {
            _webHtmlExtractor = webHtmlExtractor;
        }

        public SearchEngineResultsDto PerformGoogleSearch(GetSearchResultsQuery request)
        {
            var pos = 0;
            var occurrenceList = new List<int>();
            for (var i = 1; i < 10; i++)
            {
                var html = $"https://infotrack-tests.infotrack.com.au/Google/Page0{i}.html";
                var htmlDoc = _webHtmlExtractor.Load(html);
                
                var interestedNodes = htmlDoc.DocumentNode.SelectNodes("//*[@id=\"rso\"]/div[*]/div/div/a/div/cite");
                foreach (var node in interestedNodes)
                {
                    pos++;
                    if(pos > MaxPosition) return new SearchEngineResultsDto(occurrenceList, occurrenceList.Count);
                    if(node.InnerHtml.Contains(request.Address)) 
                        occurrenceList.Add(pos);
                }
            }
            
            return new SearchEngineResultsDto(occurrenceList, occurrenceList.Count);
        }

        public SearchEngineResultsDto PerformBingSearch(GetSearchResultsQuery request)
        {
            var pos = 0;
            var occurrenceList = new List<int>();
            for (var i = 1; i < 10; i++)
            {
                var html = $"https://infotrack-tests.infotrack.com.au/Bing/Page0{i}.html";
                var htmlDoc = _webHtmlExtractor.Load(html);
                
                var interestedNodes = htmlDoc.DocumentNode.SelectNodes("//*[@id=\"b_results\"]/li[*]/div/div/cite");
                foreach (var node in interestedNodes)
                {
                    pos++;
                    if(pos > MaxPosition) return new SearchEngineResultsDto(occurrenceList, occurrenceList.Count);
                    if(node.InnerHtml.Contains(request.Address)) 
                        occurrenceList.Add(pos);
                }
            }
            
            return new SearchEngineResultsDto(occurrenceList, occurrenceList.Count);
        }
        
    }
}
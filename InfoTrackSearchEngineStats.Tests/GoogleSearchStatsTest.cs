using System.Linq;
using Application.Search.Model;
using Application.Search.Query;
using Application.Services;
using BddPipe;
using BusinessLogic.ServiceImplementations;
using HtmlAgilityPack;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Shouldly;

namespace InfoTrackSearchEngineStats.Tests
{
    public class GoogleSearchStatsTest
    {
        public ServiceProvider ServiceProvider { get; private set; }
        [SetUp]
        public void Setup()
        {
            var services = new ServiceCollection();
            services.AddScoped<ISearchService, SearchService>();
            services.AddScoped<HtmlWeb>();
            ServiceProvider = services.BuildServiceProvider();
        }

        [TestCase("infotrack.com.au", 1)]
        [TestCase("infotrackgo.com.au", 8)]
        public void GoogleSearchResultsMustMatchStaticSearch(string searchAddr, int searchPosition)
        {
            Runner.Scenario()
                .Given("Search String and a search address", () =>
                    new
                    {
                        searchString = "Online Title Search",
                        searchAddress = searchAddr

                    })
                .When($"{nameof(ISearchService.PerformGoogleSearch)} is called", context =>
                {
                    var searchService = ServiceProvider.GetRequiredService<ISearchService>();
                    return searchService.PerformGoogleSearch(new GetSearchResultsQuery(SearchEngine.Google,
                        context.searchString, context.searchAddress));
                })
                .Then("Search result must not be null ", result =>
                {
                    result.ShouldNotBeNull();
                })
                .And($"Search position should be {searchPosition}", result =>
                {
                    result.SearchPosition.First().ShouldBe(searchPosition);
                }).Run();
        }
        
        [Test]
        public void GoogleSearchResultsMustReturnEmpty()
        {
            Runner.Scenario()
                .Given("Search String and a search address", () =>
                    new
                    {
                        searchString = "Online Title Search",
                        searchAddress = "www.commbank.com.au"

                    })
                .When($"{nameof(ISearchService.PerformGoogleSearch)} is called", context =>
                {
                    var searchService = ServiceProvider.GetRequiredService<ISearchService>();
                    return searchService.PerformGoogleSearch(new GetSearchResultsQuery(SearchEngine.Google,
                        context.searchString, context.searchAddress));
                })
                .Then("Search result must not be null ", result =>
                {
                    result.ShouldNotBe(null);
                })
                .And("Search position should be empty", result =>
                {
                    result.SearchPosition.ShouldBeEmpty();
                }).Run();
        }
    }
}
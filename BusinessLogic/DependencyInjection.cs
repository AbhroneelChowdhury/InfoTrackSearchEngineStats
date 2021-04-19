using Application.Services;
using BusinessLogic.ServiceImplementations;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessLogic(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddScoped<ISearchService, SearchService>();
            services.AddScoped<HtmlWeb>();

            return services;
        }
    }
}
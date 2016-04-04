using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using a4.Models;
using a4.Repositories;

namespace a4
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }
         
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddJsonOptions(opt =>
            {
                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddEntityFramework().AddSqlServer().AddDbContext<ProjectContext>();
            services.AddTransient<ProjectAppSeedData>();
            services.AddScoped<IProjectRepository, ProjectRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ProjectAppSeedData seeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMvc();

            seeder.SeedData();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

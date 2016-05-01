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
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Authentication.Cookies;
using System.Net;

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
            services.AddIdentity<toDoUser, IdentityRole>( 
                c =>
                {
                    c.Password.RequiredLength = 8;
                    c.Password.RequireNonLetterOrDigit = false;
                    c.Password.RequireUppercase = true;
                    c.Password.RequireLowercase = true;
                    c.Password.RequireDigit = true;
                    c.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api"))
                            {
                                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            }

                            return Task.FromResult(0);
                        }
                    };

                    c.Password.RequireNonLetterOrDigit = false;



    }).AddEntityFrameworkStores<toDoContext>();
            services.AddEntityFramework().AddSqlServer().AddDbContext<toDoContext>();
            services.AddTransient<toDoAppSeedData>();
            services.AddScoped<ItoDoRepository, toDoRepository>();
            services.AddScoped<IwarningRepository, warningRepository>();

        }

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, toDoAppSeedData seeder)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    app.UseIISPlatformHandler();

    app.UseDefaultFiles();

    app.UseStaticFiles();

    

    app.UseIdentity();

    app.UseMvc();

    await seeder.SeedData();
    }

    // Entry point for the application.
    public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

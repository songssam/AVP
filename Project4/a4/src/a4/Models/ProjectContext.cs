using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace a4.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Project> Project { get; set; }
      
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:ProjectAppConnectionString"];
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}

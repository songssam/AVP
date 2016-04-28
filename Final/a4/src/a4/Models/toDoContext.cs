using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace a4.Models
{
    public class toDoContext : IdentityDbContext<toDoUser>
    { 
        public toDoContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<toDo> toDo { get; set; }
        
        public DbSet<warning> warning { get; set; }
      
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:ProjectAppConnectionString"];
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}

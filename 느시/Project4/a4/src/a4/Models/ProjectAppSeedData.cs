using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Models
{
    public class ProjectAppSeedData
    {
        private ProjectContext _context;
        public ProjectAppSeedData(ProjectContext context)
        {
            _context = context;
        }
        public void SeedData()
        {
            if (!_context.Project.Any())
            {
                _context.Add(new Project()
                {
                    Name = "Project 1",
                    Description = "My favorite project",
                    DueDate = new DateTime(2016,4,2,12,0,0)
                });
                _context.Add(new Project()
                {
                    Name = "Project 3",
                    Description = "Angular project of death",
                    DueDate = new DateTime(2016,4,3,12,0,0)
                });
                _context.SaveChanges();

            }
        }
    }
}


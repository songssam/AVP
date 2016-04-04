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
                    tags = "life, business",
                    description = "Wake up early in the morning",
                    dueDate = new DateTime(2015, 3, 4, 6, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "life",
                    description = "Eat well",
                    dueDate = new DateTime(2015, 3, 5, 12, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "business",
                    description = "Skip work",
                    dueDate = new DateTime(2015, 4, 4, 12, 0, 0),
                    state = "Completed"
                });
                _context.Add(new Project()
                {
                    tags = "business",
                    description = "Drink coffee",
                    dueDate = new DateTime(2015, 4, 5, 12, 0, 0),
                    state = "Completed"
                }); _context.Add(new Project()
                {
                    tags = "business",
                    description = "Clean the desk",
                    dueDate = new DateTime(2015, 4, 6, 12, 0, 0),
                    state = "Completed"
                });
                _context.Add(new Project()
                {
                    tags = "business",
                    description = "Check the schedule",
                    dueDate = new DateTime(2016, 4, 4, 12, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "business",
                    description = "Go to bathroom",
                    dueDate = new DateTime(2016, 4, 4, 15, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "business",
                    description = "Go to meet a buyer",
                    dueDate = new DateTime(2016, 4, 4, 18, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "family",
                    description = "Go grocery",
                    dueDate = new DateTime(2016, 4, 5, 17, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "family",
                    description = "Prepare for family dinner",
                    dueDate = new DateTime(2016, 4, 5, 18, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "school",
                    description = "Do the homework",
                    dueDate = new DateTime(2016, 4, 6, 18, 0, 0),
                    state = "Active"
                });
                _context.Add(new Project()
                {
                    tags = "school",
                    description = "Skip the class",
                    dueDate = new DateTime(2016, 4, 7, 15, 0, 0),
                    state = "Active"
                });
                _context.SaveChanges();

            }
        }
    }
}
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Models
{
    public class toDoAppSeedData
    {
        private toDoContext _context;
        private UserManager<toDoUser> _userManager;
        public toDoAppSeedData(toDoContext context, UserManager<toDoUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task SeedData()
        {
            if (await _userManager.FindByNameAsync("Samuel") == null)
            {
                var defaultUser = new toDoUser()
                {
                    UserName = "Samuel",
                };
                await _userManager.CreateAsync(defaultUser, "ASDqwe123"); 
            }
            if (!_context.toDo.Any())
            {
                _context.Add(new toDo()
                {
                    tags = "life, business",
                    description = "Wake up early in the morning",
                    dueDate = new DateTime(2015, 5, 4, 6, 0, 0),
                    state = "Active",
                    UserName = "Samuel"
                });
                _context.Add(new toDo()
                {
                    tags = "life",
                    description = "Eat well",
                    dueDate = new DateTime(2015, 3, 5, 12, 0, 0),
                    state = "Active",
                    UserName = "Jessica"
                });
                _context.Add(new toDo()
                {
                    tags = "business",
                    description = "Skip work",
                    dueDate = new DateTime(2015, 4, 4, 12, 0, 0),
                    state = "Completed",
                    UserName = "Samuel"
                });
                if (!_context.warning.Any())
                {
                    _context.Add(new warning()
                    {
                        Time = 48,
                        UserName = "Samuel"
                    });
                }
                _context.SaveChanges();
            }
        }
    }
}
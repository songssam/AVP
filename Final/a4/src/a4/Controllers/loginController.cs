using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Identity;
using a4.Models;
using Microsoft.AspNet.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    
    public class LoginController : Controller
    {
        private SignInManager<toDoUser> _signInManager;
        private UserManager<toDoUser> _userManager;
        private toDoContext _context;

        public LoginController(SignInManager<toDoUser> signinManager, UserManager<toDoUser> userManager, toDoContext context)
        {
            _signInManager = signinManager;
            _userManager = userManager;
            _context = context;
        }
        // POST: api/login
        [HttpPost]
        public async Task<HttpStatusCodeResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var signinResult = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true,
                false);
            if (!signinResult.Succeeded)
            {
                return new HttpUnauthorizedResult();
            }
            return new HttpOkResult();
        }

        // POST: api/login/register
        [HttpPost("register")]
        public async Task<IdentityResult> Register([FromBody] LoginViewModel loginViewModel)
        {
            var newUser = new toDoUser()
            {
                UserName = loginViewModel.UserName
            };
            IdentityResult IdentityResult = await _userManager.CreateAsync(newUser, loginViewModel.Password);
            if (IdentityResult.Succeeded)
            {
                await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true, false);

                _context.Add(new toDo()
                {
                    tags = "tag1, tag2, tag3...",
                    description = "the detail of toDo",
                    dueDate = new DateTime(2016, 5, 08, 12, 0, 0),
                    state = "Active",
                    UserName = loginViewModel.UserName
                });
                _context.Add(new warning()
                {
                    Time = 48,
                    UserName = loginViewModel.UserName
                });
                _context.SaveChanges();

            }
            return IdentityResult;
        }
    }
}
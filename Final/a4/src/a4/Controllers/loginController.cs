using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Identity;
using a4.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<ProjectUser> _signInManager;

        public LoginController(SignInManager<ProjectUser> signinManager)
        {
            _signInManager = signinManager;
        }
        // GET: api/values
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
    }
}
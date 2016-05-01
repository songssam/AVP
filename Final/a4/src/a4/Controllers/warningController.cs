using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using a4.Repositories;
using a4.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class warningController : Controller
    {
        private IwarningRepository _repository;
        private UserManager<toDoUser> _userManager;

        public warningController(IwarningRepository repository, UserManager<toDoUser> UserManager)
        {
            _repository = repository;
            _userManager = UserManager;
        }
        [HttpGet]
        public async Task<IEnumerable<warning>> Get()
        {
            return _repository.List((await _userManager.FindByNameAsync(User.Identity.Name)).UserName);
        }
        // GET api/todo/0
        [HttpGet("{id}")]
        public warning Get(int id)
        {
            return _repository.FindById(id);
        }

        // PUT api/warning
        [HttpPut]
        public void Put([FromBody]warning warning)
        {
            _repository.Update(warning);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNet.Mvc;
using a4.Models;
using a4.Repositories;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class toDoController : Controller
    {
        private ItoDoRepository _repository;
        private UserManager<toDoUser> _userManager;
      
        public toDoController(ItoDoRepository repository, UserManager<toDoUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }
        // GET: api/todo
        [HttpGet]
        public async Task<IEnumerable<toDo>> Get()
        {
            return _repository.List((await _userManager.FindByNameAsync(User.Identity.Name)).UserName);
        }
        // GET api/todo/0
        [HttpGet("{id}")]
        public toDo Get(int id)
        {
            return _repository.FindById(id);
        }

        // GET api/todo/search/{queryString}
        [HttpGet("search/{queryString}")]
        public IEnumerable<toDo> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // Get api/proejct/tag/{queryString}
        [HttpGet("tag/{queryString}")]
        public async Task<IEnumerable<toDo>> Tag(string queryString, string username)
        {
            return _repository.Tag(queryString, (await _userManager.FindByNameAsync(User.Identity.Name)).UserName);
        }

        // POST api/todo/register
        [HttpPost("register")]
        public async Task Post([FromBody]toDo newtoDo)
        {
            _repository.Create(newtoDo, (await _userManager.FindByNameAsync(User.Identity.Name)).UserName);
        }

        // PUT api/project
        [HttpPut()]
        public void Put([FromBody]toDo toDo)
        {
            _repository.Update(toDo);
        }

        // DELETE api/project/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}

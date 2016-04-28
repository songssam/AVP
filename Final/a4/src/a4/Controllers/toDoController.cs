using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNet.Mvc;
using a4.Models;
using a4.Repositories;
using Microsoft.AspNet.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class toDoController : Controller
    {
        private ItoDoRepository _repository;

        public toDoController(ItoDoRepository repository)
        {
            _repository = repository;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<toDo> Get()
        {
            var toDo = _repository.List();
            return toDo;
        }
        // GET api/project/0
        [HttpGet("{id}")]
        public toDo Get(int id)
        {
            return _repository.FindById(id);
        }

        // GET api/project/search/{queryString}
        [HttpGet("search/{queryString}")]
        public IEnumerable<toDo> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // Get api/proejct/tag/{queryString}
        [HttpGet("tag/{queryString}")]
        public IEnumerable<toDo> Tag(string queryString)
        {
            return _repository.Tag(queryString);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]toDo newtoDo)
        {
            Response.StatusCode = (int)HttpStatusCode.Created;
            _repository.Create(newtoDo);
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

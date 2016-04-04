using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using a4.ViewModels;
using Microsoft.AspNet.Mvc;
using a4.Models;
using a4.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private IProjectRepository _repository;

        public ProjectController(IProjectRepository repository)
        {
            _repository = repository;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            var project = _repository.List();
            return project;
        }
        // GET api/project/0
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _repository.FindById(id);
        }

        // GET api/project/search/{queryString}
        [HttpGet("search/{queryString}")]
        public IEnumerable<Project> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // Get api/proejct/tag/{queryString}
        [HttpGet("tag/{queryString}")]
        public IEnumerable<Project> Tag(string queryString)
        {
            return _repository.Tag(queryString);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Project newProject)
        {
            Response.StatusCode = (int)HttpStatusCode.Created;
            _repository.Create(newProject);
        }

        // PUT api/project
        [HttpPut()]
        public void Put([FromBody]Project project)
        {
            _repository.Update(project);
        }

        // DELETE api/project/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}

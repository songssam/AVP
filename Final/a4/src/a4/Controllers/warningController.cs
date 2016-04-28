using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using a4.Repositories;
using a4.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace a4.Controllers
{
    [Route("api/[controller]")]
    public class warningController : Controller
    {
        private IwarningRepository _repository;

        public warningController(IwarningRepository repository)
        {
            _repository = repository;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<warning> Get()
        {
            var toDo = _repository.List();
            return toDo;
        }
        // GET api/project/0
        [HttpGet("{id}")]
        public warning Get(int id)
        {
            return _repository.FindById(id);
        }
        // PUT api/project
        [HttpPut()]
        public void Put([FromBody]warning toDo)
        {
            _repository.Update(toDo);
        }
}
}

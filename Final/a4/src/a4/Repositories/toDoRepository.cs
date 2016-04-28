using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using a4.Models;

namespace a4.Repositories
{
    class toDoRepository : ItoDoRepository
    {
        private toDoContext _context;

        public toDoRepository(toDoContext context)
        {
            _context = context;
        }
        public void Create(toDo toDo)
        {
            _context.toDo.Add(toDo);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var toDoToDelete = FindById(id);
            if (toDoToDelete != null)
            {
                _context.toDo.Remove(toDoToDelete);
                _context.SaveChanges();
            }
        }

        public void Update(toDo toDo)
        {
            var toDoToUpdate = FindById(toDo.Id);
            toDoToUpdate.tags = toDo.tags;
            toDoToUpdate.description = toDo.description;
            toDoToUpdate.dueDate = toDo.dueDate;
            toDoToUpdate.state = toDo.state;
            _context.SaveChanges();
        }

        public IEnumerable<toDo> List()
        {
            var toDo = _context.toDo.ToList();
            return toDo;
        }

        public toDo FindById(int id)
        {
            var toDo = _context.toDo.First(p => p.Id == id);
            return toDo;
        }

        public IEnumerable<toDo> FindBySearchString(string queryString)
        {
           
            return _context.toDo.Where(p => p.tags.Contains(queryString));
        }

        public IEnumerable<toDo> Tag(string queryString)
        {
            List<string> tags = queryString.Split(',').ToList();
            return (from word in _context.toDo
                    where tags.All(tag => word.tags.Contains(tag))
                    select word).ToList();
        }
    }
}
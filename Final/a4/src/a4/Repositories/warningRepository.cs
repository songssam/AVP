using a4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Repositories
{
    public class warningRepository : IwarningRepository
    {
        private toDoContext _context;

        public warningRepository(toDoContext context)
        {
            _context = context;
        }

        public void Update(warning warning)
        {
            var newTime = FindById(warning.Id);
            newTime.Time = warning.Time;
            _context.SaveChanges();
        }

        public IEnumerable<warning> List()
        {
            //change list to only find the one listed by a certain username
            //(where clause)
            return _context.warning.ToList();
        }

        public warning FindById(int id)
        {
            return _context.warning.First(p => p.Id == id);
        }

        public warning FindByUserName(string username)
        {
            return _context.warning.First(p => p.UserName == username);
        }

    }
}

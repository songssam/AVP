using a4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Repositories
{
   class warningRepository : IwarningRepository
    {
        private toDoContext _context;

        public warningRepository(toDoContext context)
        {
            _context = context;
        }

        public void Update(warning warning)
        {
            var warningTime = FindById(warning.Id);
            warningTime.Time = warning.Time;
            _context.SaveChanges();
        }

        public IEnumerable<warning> List()
        {
            var warning = _context.warning.ToList();
            return warning;
        }

        public warning FindById(int id)
        {
            var warning = _context.warning.First(p => p.Id == id);
            return warning;
        }

        warning IwarningRepository.FindById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

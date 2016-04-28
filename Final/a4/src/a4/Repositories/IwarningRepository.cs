using a4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Repositories
{
    public interface IwarningRepository
    {
        void Update(warning warning);

        IEnumerable<warning> List();

        warning FindById(int id);
    }
}

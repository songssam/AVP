using a4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Repositories
{
    public interface IProjectRepository
    {
        void Create(Project project);

        void Delete(int id);

        void Update(Project project);

        IEnumerable<Project> List();

        Project FindById(int id);
        IEnumerable<Project> FindBySearchString(string queryString);
    }
}

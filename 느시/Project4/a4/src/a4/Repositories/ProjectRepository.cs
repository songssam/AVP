using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using a4.Models;

namespace a4.Repositories
{
    class ProjectRepository : IProjectRepository
    {
        private ProjectContext _context;

        public ProjectRepository(ProjectContext context)
        {
            _context = context;
        }
        public void Create(Project project)
        {
            _context.Project.Add(project);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var projectToDelete = FindById(id);
            if (projectToDelete != null)
            {
                _context.Project.Remove(projectToDelete);
                _context.SaveChanges();
            }
        }

        public void Update(Project project)
        {
            var projectToUpdate = FindById(project.Id);
            projectToUpdate.Name = project.Name;
            projectToUpdate.Description = project.Description;
            _context.SaveChanges();
        }

        public IEnumerable<Project> List()
        {
            var projects = _context.Project.ToList();
            return projects;
        }

        public Project FindById(int id)
        {
            var project = _context.Project.First(p => p.Id == id);
            return project;
        }

        public IEnumerable<Project> FindBySearchString(string queryString)
        {
            return _context.Project.Where(p => p.Name.Contains(queryString));
        }
    }
}
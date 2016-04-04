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
            projectToUpdate.tags = project.tags;
            projectToUpdate.description = project.description;
            projectToUpdate.dueDate = project.dueDate;
            projectToUpdate.state = project.state;
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
           
            return _context.Project.Where(p => p.tags.Contains(queryString));
        }

        public IEnumerable<Project> Tag(string queryString)
        {
            List<string> tags = queryString.Split(',').ToList();
            return (from word in _context.Project
                    where tags.All(tag => word.tags.Contains(tag))
                    select word).ToList();
        }
    }
}
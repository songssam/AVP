using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string tags { get; set; }
        public string description { get; set; }
        public DateTime dueDate { get; set; }
        public string state { get; set; }
         
    }
}

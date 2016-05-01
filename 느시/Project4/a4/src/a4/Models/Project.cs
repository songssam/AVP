﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        public IEnumerable<Requirement> Requirements { get; set; }            
    }
}

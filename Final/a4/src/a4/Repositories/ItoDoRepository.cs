﻿using a4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a4.Repositories
{
    public interface ItoDoRepository
    {
        void Create(toDo toDo, string username);

        void Delete(int id);

        void Update(toDo toDo);

        IEnumerable<toDo> List(string username);

        toDo FindById(int id);
        IEnumerable<toDo> FindBySearchString(string queryString);
        IEnumerable<toDo> Tag(string queryString, string username);
    }
}

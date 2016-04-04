using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using a4.Models;

namespace a4.Migrations
{
    [DbContext(typeof(ProjectContext))]
    [Migration("20160404161316_initDB")]
    partial class initDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("a4.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<DateTime>("dueDate");

                    b.Property<string>("state");

                    b.Property<string>("tags");

                    b.HasKey("Id");
                });
        }
    }
}

﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ALogBook.EFData
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ALogBookContainer : DbContext
    {
        public ALogBookContainer()
            : base("name=ALogBookContainer")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<TrainingHistory> TrainingHistories { get; set; }
        public virtual DbSet<RefAbbreviations> RefAbbreviations { get; set; }
        public virtual DbSet<RefSurgery> RefSurgeries { get; set; }
        public virtual DbSet<LogBook> LogBooks { get; set; }
        public virtual DbSet<ClinicSessions> ClinicSessions { get; set; }
        public virtual DbSet<RefClinics> RefClinics { get; set; }
    }
}
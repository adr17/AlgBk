//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class LogBook
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string MRN { get; set; }
        public string Procedure { get; set; }
        public string Indication { get; set; }
        public string Assist { get; set; }
        public string Supervised { get; set; }
        public string Unsupervised { get; set; }
        public string TeachingByTrainee { get; set; }
        public string Comments { get; set; }
        public int UsersId { get; set; }
        public int RefSurgeryId { get; set; }
    
        public virtual Users User { get; set; }
        public virtual RefSurgery RefSurgery { get; set; }
    }
}

using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{

  public class Category{
    public int CategoryID {get;set;}
    public string CategoryName { get; set; }

  }



}
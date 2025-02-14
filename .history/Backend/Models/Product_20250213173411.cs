using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend.Models{


    public class Product{
  
     
    
     public int ProductID {get;set;}
     public string Name{get;set;}
    public string Description {get;set;}
    public int StockQuantity {get;set;}
    public int CategoryID {get;set;}
    public string ImageURL { get; set; }
    public virtual Category Category{get;set;}

    }
}
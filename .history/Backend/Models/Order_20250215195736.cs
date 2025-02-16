using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
 public class Order{

    public int orderID{get;set;}
    public string Email{get;set;}
    public int ProductID{get;set;}
    public decimal TotalAmount{get;set;}

    

    
 }
}
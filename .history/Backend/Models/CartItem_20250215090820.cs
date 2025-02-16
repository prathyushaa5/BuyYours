using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend.Models{


    public class CartItem{
  
     
    
 public int CartItemID { get; set; }
    public int CartID { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }
    public decimal PriceAtAddition { get; set; }

    // Navigation properties
    public Cart Cart { get; set; }
    public Product Product { get; set; }



    }
}
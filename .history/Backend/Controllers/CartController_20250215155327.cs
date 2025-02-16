using Microsoft.AspNetCore.Mvc;
using System.Data;
using Dapper;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;

namespace Backend.Controllers{

   [Route("api/carts")]
   [ApiController]
   public class CartController:ControllerBase{

    private readonly IDbConnection _dbConnection;
    private readonly IConfiguration _configuration;
    public CartController(IDbConnection dbConnection,IConfiguration configuration){
        _dbConnection=dbConnection;
        _configuration =configuration;
    }


    [HttpGet]
    public async Task<IActionResult>getCart(){
        int userId=GetUserIdFromToken();
        var cart=await GetOrCreateCartAsync(userId);
        
        return Ok(cart);
       
    }

    [HttpPost("add")]
    public async Task<IActionResult>AddToCart(int productId,int quantity){
        if(quantity<=0){
            return BadRequest("Quantity less than zero!");


        }
        int userId=GetUserIdFromToken();
        var queryProduct="select * from Product where ProductID=@ProductID";
        var product=await _dbConnection.QueryFirstOrDefaultAsync<Product>(queryProduct,new {ProductID=productId});
        if(product==null){
            return NotFound("Product Not Found");
        }
        var cart=await GetOrCreateCartAsync(userId);
        var cartquery="Select * from CartItems where CartID=@CartID &&ProductID=@ProductID";

         var cartItem=await _dbConnection.QueryFirstOrDefaultAsync(cartquery,new {CartID=cart.CartID,ProductID=product.ProductID});
         if (cartItem != null)
            {
                cartItem.Quantity += quantity;
                await _dbConnection.ExecuteAsync(
                    "UPDATE CartItems SET Quantity = @Quantity WHERE CartItemID = @CartItemID",
                    new { cartItem.Quantity, cartItem.CartItemID });
            }
            else
            {
                var priceAtAddition = product.Price;
                await _dbConnection.ExecuteAsync(
                    "INSERT INTO CartItems (CartID, ProductID, Quantity, PriceAtAddition) VALUES (@CartID, @ProductID, @Quantity, @PriceAtAddition)",
                    new { CartID = cart.CartID, ProductID = productId, Quantity = quantity, PriceAtAddition = priceAtAddition });
            }

            return Ok("Product added to cart.");

    }
    [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            int userId = GetUserIdFromToken();

            var cart = await GetOrCreateCartAsync(userId);

            var cartItem = await _dbConnection.QueryFirstOrDefaultAsync<CartItem>(
                "SELECT * FROM CartItems WHERE CartID = @CartID AND ProductID = @ProductID",
                new { CartID = cart.CartID, ProductID = productId });

            if (cartItem == null)
            {
                return NotFound("Product not found in cart.");
            }

            await _dbConnection.ExecuteAsync(
                "DELETE FROM CartItems WHERE CartItemID = @CartItemID",
                new { cartItem.CartItemID });

            return Ok("Product removed from cart.");
        }


   

   private async Task<Cart> GetOrCreateCartAsync(int userId){

   var query = "SELECT * FROM Cart WHERE UserID = @UserID";
var cart = await _dbConnection.QueryFirstOrDefaultAsync<Cart>(query, new { UserID = userId });

     if(cart==null){
        var nextquery=@"
    INSERT INTO Carts (UserID, CreatedDate) 
    VALUES (@UserID, @CreatedDate);
    SELECT CAST(SCOPE_IDENTITY() as int);
";
        var  cartId=await _dbConnection.QuerySingleAsync<int>(nextquery,new {UserID=userId,CreatedDate=DateTime.UtcNow});
     

     cart=new Cart{
        CartID=cartId,
        UserID=userId,
        CreatedDate=DateTime.UtcNow,
        CartItems=new List<CartItem>()




     };


     }else{
        var anotherquery="select * from CartItems where CartID=@CartID";
        var cartItems=await _dbConnection.QueryAsync<CartItem>(anotherquery,new {CartID=cart.CartID});
        cart.CartItems=cartItems.ToList();

     }
     return cart;
   }






   







    private int GetUserIdFromToken()
        {
            // Implement logic to extract UserID from JWT token
            // This is a placeholder implementation
            return 1003; // Replace with actual user ID extraction logic
        }
    
   }



}
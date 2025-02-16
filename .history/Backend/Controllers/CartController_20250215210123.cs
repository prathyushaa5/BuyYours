using Microsoft.AspNetCore.Mvc;
using System.Data;
using Dapper;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;

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
  
public async Task<IActionResult> getCart()
{
    var claims = User.Claims.ToList(); // Get all claims

    // Log all claims for debugging
    var allClaims = claims.Select(c => $"{c.Type}: {c.Value}").ToList();
    Console.WriteLine($"Claims received: {string.Join(", ", allClaims)}");

    // Try to extract UserId claim
    var userIdClaim = claims.FirstOrDefault(c => c.Type == "UserId");

    if (userIdClaim == null)
    {
        return Unauthorized($"User ID not found in token. Claims received: {string.Join(", ", allClaims)}");
    }

    if (!int.TryParse(userIdClaim.Value, out int userId))
    {
        return BadRequest("Invalid User ID in token.");
    }

    var cart = await GetOrCreateCartAsync(userId);
    return Ok(cart);
}


    [HttpPost("add")]
    public async Task<IActionResult>AddToCart(int productId,int quantity){
        if(quantity<=0){
            return BadRequest("Quantity less than zero!");
 

        }
        foreach (var claim in User.Claims)
{
    Console.WriteLine($"Claim Type: {claim.Type}, Value: {claim.Value}");
}

       var userIdClaim = User.FindFirst("UserId");

        if (userIdClaim == null)
        {
            return Unauthorized("User ID not found in token.");
        }

        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return BadRequest("Invalid User ID in token.");
        }
        var queryProduct="select * from Product where ProductID=@ProductID";
        var product=await _dbConnection.QueryFirstOrDefaultAsync<Product>(queryProduct,new {ProductID=productId});
        if(product==null){
            return NotFound("Product Not Found");
        }
        var cart=await GetOrCreateCartAsync(userId);
        var cartquery="Select * from CartItems where CartID=@CartID AND ProductID=@ProductID";

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
           var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null)
        {
            return Unauthorized("User ID not found in token.");
        }

        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return BadRequest("Invalid User ID in token.");
        }

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

   var query = "SELECT * FROM Carts WHERE UserID = @UserID";
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






   







    private int GetUserIdFromToken(HttpContext httpContext)
        {
            var authHeader = httpContext.Request.Headers["Authorization"].ToString();
    if (authHeader != null && authHeader.StartsWith("Bearer "))
    {
        var token = authHeader.Substring("Bearer ".Length).Trim();
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        {
            return userId;
        }
    }
    throw new Exception("User ID claim not found in token.");
        }
    
   }



}
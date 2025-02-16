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


    [HttpGet("{id}")]
  
public async  Task<IActionResult> getCart(int id){
    var query="select * from Users where Id=@Id";
    var user=await _dbConnection.QueryFirstAsync<User>(query,new {Id=id});
    if(user==null){
        return BadRequest("No user logged in");
    }
    var cart=await GetOrCreateCartAsync(user.Id);
    return Ok(cart);


        // Check if user is authenticated
        
    
}

[HttpPost("add")]
public async Task<IActionResult> AddToCart(int userId, int productId, int quantity)
{
   

    var queryProduct = "SELECT * FROM Product WHERE ProductID=@ProductID";
    var product = await _dbConnection.QueryFirstOrDefaultAsync<Product>(queryProduct, new { ProductID = productId });

    if (product == null)
    {
        return NotFound("Product Not Found");
    }

    var cart = await GetOrCreateCartAsync(userId);
    var cartQuery = "SELECT * FROM CartItems WHERE CartID=@CartID AND ProductID=@ProductID";
    var cartItem = await _dbConnection.QueryFirstOrDefaultAsync<CartItem>(cartQuery, new { CartID = cart.CartID, ProductID = product.ProductID });

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
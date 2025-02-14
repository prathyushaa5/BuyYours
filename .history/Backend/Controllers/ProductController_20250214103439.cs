using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using Backend.Models;
namespace Backend.Controllers{

[Route("api/products")]
[ApiController]
public class ProductController:ControllerBase{

    private readonly IDbConnection _dbConnection;
    public ProductController(IDbConnection dbConnection){
        _dbConnection=dbConnection;
    }


    [HttpGet]
    public async Task<IActionResult>GetAllProducts(){
        var query="select * from Product";
        var products=await _dbConnection.QueryAsync<Product>(query);
         return Ok(products);
    }


    [HttpGet("{id}")]

    public async Task<IActionResult>GetProductById(int id){
        var query="select * from Product where ProductID=@Id";
        var result=await _dbConnection.QueryFirstOrDefaultAsync<Product>(query,new{Id=id});
        if(result!=null){
            return Ok(result);
        }
        return NotFound("Not found ");
    }


    [HttpPost]
    public async Task<IActionResult>PostProduct(Product product){
        var query= @"INSERT INTO Product (Name, Description, StockQuantity, CategoryID,Price ImageURL) 
                          VALUES (@Name, @Description, @StockQuantity, @CategoryID,@Price @ImageURL)";
        await _dbConnection.ExecuteAsync(query,product);
        return Ok("Product added successfully");
    }


    [HttpPut("{id}")]
    public async Task<IActionResult>UpdateProduct(int id,[FromBody]Product product){
      var query="select * from Product where ProductID=@Id";
      var result=await _dbConnection.QueryFirstOrDefaultAsync<Product>(query,new {Id=id});
      if(result==null){
      return NotFound("Product Not Found");
      }
      var nextquery=@"update Product SET Name = @Name, Description = @Description, StockQuantity = @StockQuantity, 
                              CategoryID = @CategoryID,Price=@Price, ImageURL = @ImageURL 
                          WHERE ProductID = @ProductID";
            product.ProductID=id; 

    await _dbConnection.ExecuteAsync(nextquery,product);
    return Ok("Product updated successssfully");

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>DeleteProduct(int id){
        var query="Delete from Product where ProductId=@Id";
       var affected= await _dbConnection.ExecuteAsync(query,new{Id=id});
       if(affected==null){
        return NotFound("Product Not Found");

       }
       return Ok("Product Deleted Successfully");


    }
    [HttpGet]
    [Route("api/controllers/categories")]
    public async Task<IActionResult>Get(){
        var query="select * from Category";
        var results=await _dbConnection.QueryAsync(query);
        return Ok(results);
    }


   [HttpGet("categoryByName/{name}")]
public async Task<IActionResult> GetByName(string name)
{
    var query = "SELECT * FROM Product WHERE CategoryID = (SELECT CategoryID FROM Category WHERE CategoryName = @name)";
    var categoryitems = await _dbConnection.QueryAsync(query, new { name });

    if (categoryitems != null && categoryitems.Any())
        return Ok(categoryitems);

    return NotFound("No items found");
}





}



}
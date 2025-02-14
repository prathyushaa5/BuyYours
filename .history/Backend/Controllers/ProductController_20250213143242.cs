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
        var query= @"INSERT INTO Product (Name, Description, StockQuantity, CategoryID, ImageURL) 
                          VALUES (@Name, @Description, @StockQuantity, @CategoryID, @ImageURL)";
        await _dbConnection.ExecuteAsync(query,product);
        return Ok("Product added successfully");
    }


}



}
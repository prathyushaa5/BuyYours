using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using Dapper;
using System.Data;

namespace Backend.Controllers{


    [Route("api/auth")]
    [ApiController]
    public class AuthController:ControllerBase{
        private readonly IDbConnection _dbConnection;
        private readonly IConfiguration _configuration;

        public AuthController(IDbConnection dbConnection,IConfiguration configuration){
            _dbConnection=dbConnection;
            _configuration=configuration;
        }


        [HttpPost("register")]
        public async Task<IActionResult>Register([FromBody] User user){
            var query="select * from Users where Email=@Email";
            var existinguser= await _dbConnection.QueryFirstOrDefaultAsync(query,new{user.Email});

            if(existinguser!=null){
                return BadRequest("User already there..");
            }
            user.PasswordHash=HashPassword(user.PasswordHash);


            var insertquery=@"insert into Users(Username,Email,PasswordHash) values(@Username,@Email,@Password)";
            await _dbConnection.ExecuteAsync(insertquery,user);
            return Ok("User registered successfully.");
        }


        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        // ✅ Helper method to verify hashed password
        private bool VerifyPassword(string enteredPassword, string storedPasswordHash)
        {
            return HashPassword(enteredPassword) == storedPasswordHash;
        }
    }
}
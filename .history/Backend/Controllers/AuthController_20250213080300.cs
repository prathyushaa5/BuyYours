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


            var insertquery=@"insert into Users(Username,Email,PasswordHash) values(@Username,@Email,@PasswordHash)";
            await _dbConnection.ExecuteAsync(insertquery,user);
            return Ok("User registered successfully.");
        }


        [HttpPost("login")]
        public async Task<IActionResult>Login([FromBody] LoginRequest req){
            var query=@"select * from Users where Email=@Email ";
            
            var existinguser=await _dbConnection.QueryFirstOrDefaultAsync(query,new {req.Email});
            if(existinguser==null)
            return Unauthorized("Invalid email ");
            else 
            if(!VerifyPassword(req.Password,existinguser.PasswordHash))
            return Unauthorized("Invalid password");


            var token=await GenerateJwtToken(existinguser);
            return Ok(token);
        }
         private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
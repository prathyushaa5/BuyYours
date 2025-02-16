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
            var existinguser= await _dbConnection.QueryFirstOrDefaultAsync<User>(query,new{user.Email});

            if(existinguser!=null){
                return BadRequest("User already there..");
            }
            user.PasswordHash=HashPassword(user.PasswordHash);


            var insertquery=@"insert into Users(Username,Email,PasswordHash) values(@Username,@Email,@PasswordHash)";
            await _dbConnection.ExecuteAsync(insertquery,user);
            
            var token= GenerateJwtToken(user);
            return Ok(new{token});
           
        }


        [HttpPost("login")]
        public async Task<IActionResult>Login([FromBody] LoginRequest req){
            var query=@"select * from Users where Email=@Email ";
            
            var existinguser=await _dbConnection.QueryFirstOrDefaultAsync<User>(query,new {req.Email});
            if(existinguser==null)
            return Unauthorized("Invalid email ");
            else 
            if(!VerifyPassword(req.Password,existinguser.PasswordHash))
            return Unauthorized("Invalid password");


            var token= GenerateJwtToken(existinguser);
            return Ok(new{token});
        }
        private string GenerateJwtToken(User user)
{
    // Retrieve JWT settings from configuration
    var jwtSettings = _configuration.GetSection("Jwt");
    var key = jwtSettings["Key"];
    var issuer = jwtSettings["Issuer"];
    var audience = jwtSettings["Audience"];

    // Validate JWT settings
    if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
    {
        throw new InvalidOperationException("JWT settings are not properly configured.");
    }

    // Create symmetric security key
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

    // Define token claims
    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("UserId", user.Id.ToString())
        // Add other claims as needed
    };

    // Create token descriptor
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(2),
        Issuer = issuer,
        Audience = audience,
        SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
    };

    // Create token handler
    var tokenHandler = new JwtSecurityTokenHandler();

    // Generate token
    var token = tokenHandler.CreateToken(tokenDescriptor);

    // Return serialized token
    return tokenHandler.WriteToken(token);
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
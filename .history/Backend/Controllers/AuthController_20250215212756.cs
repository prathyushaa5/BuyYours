using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using System.Security.Cryptography;
using BCrypt.Net; // ✅ Use BCrypt for secure password hashing

namespace Backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDbConnection _dbConnection;

        public AuthController(IConfiguration configuration, IDbConnection dbConnection)
        {
            _configuration = configuration;
            _dbConnection = dbConnection;
        }

        // ✅ REGISTER USER
        [HttpGet("debug-token")]
        public IActionResult DebugToken()
{
    if (User.Identity == null || !User.Identity.IsAuthenticated)
    {
        return Unauthorized("User is not authenticated");
    }

    var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
    return Ok(new { Message = "User is authenticated", Claims = claims });
}
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            using var connection = _dbConnection; // ✅ Use connection inside the method
            
            var query = "SELECT * FROM Users WHERE Email = @Email";
            var existingUser = await connection.QueryFirstOrDefaultAsync<User>(query, new { user.Email });

            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // ✅ Hash password using BCrypt (more secure)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            var insertQuery = "INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)";
            await connection.ExecuteAsync(insertQuery, user);

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        // ✅ LOGIN USER
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            using var connection = _dbConnection; // ✅ Use connection inside the method
            
            var query = "SELECT * FROM Users WHERE Email = @Email";
            var existingUser = await connection.QueryFirstOrDefaultAsync<User>(query, new { req.Email });

            if (existingUser == null)
            {
                return Unauthorized("Invalid email.");
            }

            // ✅ Verify password with BCrypt
            if (!BCrypt.Net.BCrypt.Verify(req.Password, existingUser.PasswordHash))
            {
                return Unauthorized("Invalid password.");
            }

            var token = GenerateJwtToken(existingUser);
            return Ok(new { token });
        }

        // ✅ GENERATE JWT TOKEN
        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = jwtSettings["Key"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                throw new InvalidOperationException("JWT settings are missing in configuration.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) // ✅ Fix claim name
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

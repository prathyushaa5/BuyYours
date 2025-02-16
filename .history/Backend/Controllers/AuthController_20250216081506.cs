using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

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
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var query = "SELECT * FROM Users WHERE Email = @Email";
            var existingUser = await _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { user.Email });

            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // ✅ Hash password using BCrypt
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            var insertQuery = "INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)";
            await _dbConnection.ExecuteAsync(insertQuery, user);

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        // ✅ LOGIN USER
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var query = "SELECT * FROM Users WHERE Email = @Email";
            var existingUser = await _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { req.Email });

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

        // ✅ GENERATE JWT TOKEN (Fixed Claims)
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
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),  // ✅ Changed for proper mapping
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
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

        // ✅ DEBUG JWT CLAIMS (Verify Authentication)
        [Authorize]
        [HttpGet("debug-claims")]
        public IActionResult DebugClaims()
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized("User is not authenticated.");
            }

            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();

            // ✅ Log claims for debugging
            Console.WriteLine("User Claims:");
            foreach (var claim in claims)
            {
                Console.WriteLine($"{claim.Type} = {claim.Value}");
            }

            return Ok(claims);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Backend.Models; // Update with your actual namespace

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; } // Example table
    }
}

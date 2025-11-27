using Microsoft.EntityFrameworkCore;

namespace NewsSite.DataAccess
{
    public class NewsSiteDbContext : DbContext
    {
        public NewsSiteDbContext(DbContextOptions<NewsSiteDbContext> options) : base(options)
        {
            
        }

        public DbSet<Entities.NewsEntity> News { get; set; }
        public DbSet<Entities.UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Entities.UserEntity>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}

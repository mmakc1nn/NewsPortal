using Microsoft.EntityFrameworkCore;

namespace NewsSite.DataAccess
{
    public class NewsSiteDbContext : DbContext
    {
        public NewsSiteDbContext(DbContextOptions<NewsSiteDbContext> options) : base(options)
        {
            
        }

        public DbSet<Entities.NewsEntity> News { get; set; }


    }
}

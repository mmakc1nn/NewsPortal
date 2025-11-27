using Microsoft.EntityFrameworkCore;
using NewsSite.Core.Models;

namespace NewsSite.DataAccess.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly NewsSiteDbContext _context;

        public UserRepository(NewsSiteDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            var entity = await _context.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (entity == null) return null;

            var (user, _) = User.Create(
                entity.Id,
                entity.Email,
                entity.PasswordHash,
                entity.FullName,
                (UserRole)entity.Role);

            if (user != null && entity.LastLoginAt.HasValue)
                user.LastLoginAt = entity.LastLoginAt;

            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var entity = await _context.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email.ToLower());

            if (entity == null) return null;

            var (user, _) = User.Create(
                entity.Id,
                entity.Email,
                entity.PasswordHash,
                entity.FullName,
                (UserRole)entity.Role);

            return user;
        }

        public async Task AddUserAsync(User user)
        {
            var entity = new Entities.UserEntity
            {
                Id = user.Id,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                FullName = user.FullName,
                Role = (int)user.Role,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt
            };

            _context.Users.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            if (entity != null)
            {
                entity.FullName = user.FullName;
                entity.Role = (int)user.Role;
                entity.LastLoginAt = user.LastLoginAt;
                await _context.SaveChangesAsync();
            }
        }
    }
}
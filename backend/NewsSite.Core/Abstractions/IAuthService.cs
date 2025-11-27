using NewsSite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.Core.Abstractions
{
    public interface IAuthService
    {
        Task<(string? token, string? error)> RegisterAsync(string email, string password, string fullName);
        Task<(string? token, string? error)> LoginAsync(string email, string password);
        Task<User?> GetUserByIdAsync(Guid userId);
    }
}

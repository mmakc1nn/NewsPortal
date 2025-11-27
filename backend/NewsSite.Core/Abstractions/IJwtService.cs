using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.Core.Abstractions
{
    public interface IJwtService
    {
        string GenerateToken(Guid userId, string email, string role);
        bool ValidateToken(string token);
    }
}

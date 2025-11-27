using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.Core.Models
{
    public class User
    {
        private User(Guid id, string email, string passwordHash, string fullName, UserRole role)
        {
            Id = id;
            Email = email;
            PasswordHash = passwordHash;
            FullName = fullName;
            Role = role;
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public string FullName { get; set; }
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? LastLoginAt { get; set; }

        public static (User? user, string? error) Create(
            Guid id,
            string email,
            string passwordHash,
            string fullName,
            UserRole role = UserRole.User)
        {
            if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
                return (null, "Invalid email format");

            if (string.IsNullOrWhiteSpace(passwordHash))
                return (null, "Password hash cannot be empty");

            if (string.IsNullOrWhiteSpace(fullName))
                return (null, "Full name cannot be empty");

            var user = new User(id, email.ToLower(), passwordHash, fullName, role);
            return (user, null);
        }

        public void UpdateLastLogin()
        {
            LastLoginAt = DateTime.UtcNow;
        }
    }

    public enum UserRole
    {
        User = 0,
        Admin = 1
    }
}


using NewsSite.Core.Models;
using NewsSite.DataAccess.Repository;
using BCrypt.Net;
using NewsSite.Core.Abstractions;

namespace NewsSite.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<(string? token, string? error)> RegisterAsync(
            string email,
            string password,
            string fullName)
        {
            // Проверяем, существует ли пользователь
            var existingUser = await _userRepository.GetUserByEmailAsync(email);
            if (existingUser != null)
                return (null, "User with this email already exists");

            // Хешируем пароль
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            // Создаём пользователя
            var (user, error) = User.Create(
                Guid.NewGuid(),
                email,
                passwordHash,
                fullName,
                UserRole.User);

            if (error != null)
                return (null, error);

            await _userRepository.AddUserAsync(user!);

            // Генерируем токен
            var token = _jwtService.GenerateToken(user!.Id, user.Email, user.Role.ToString());
            return (token, null);
        }

        public async Task<(string? token, string? error)> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
                return (null, "Invalid email or password");

            // Проверяем пароль
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return (null, "Invalid email or password");

            // Обновляем время последнего входа
            user.UpdateLastLogin();
            await _userRepository.UpdateUserAsync(user);

            // Генерируем токен
            var token = _jwtService.GenerateToken(user.Id, user.Email, user.Role.ToString());
            return (token, null);
        }

        public async Task<User?> GetUserByIdAsync(Guid userId)
        {
            return await _userRepository.GetUserByIdAsync(userId);
        }
    }
}
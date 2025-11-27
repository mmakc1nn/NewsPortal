using Microsoft.AspNetCore.Mvc;
using NewsSite.Application.Services;
using NewsSite.Contracts;
using NewsSite.Core.Abstractions;
using System.IdentityModel.Tokens.Jwt;


namespace NewsSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            var (token, error) = await _authService.RegisterAsync(
                request.Email,
                request.Password,
                request.FullName);

            if (error != null)
                return BadRequest(new { message = error });

            // Replace the problematic code in the Register method
            var user = await _authService.GetUserByIdAsync(
                Guid.Parse(new JwtSecurityTokenHandler()
                    .ReadJwtToken(token!).Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value));

            return Ok(new AuthResponse(
                token!,
                user!.Email,
                user.FullName,
                user.Role.ToString()
            ));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            var (token, error) = await _authService.LoginAsync(request.Email, request.Password);

            if (error != null)
                return Unauthorized(new { message = error });

            // Replace the problematic code in the Login method
            var userId = new JwtSecurityTokenHandler()
                .ReadJwtToken(token!)
                .Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            var user = await _authService.GetUserByIdAsync(Guid.Parse(userId));

            return Ok(new AuthResponse(
                token!,
                user!.Email,
                user.FullName,
                user.Role.ToString()
            ));
        }
    }
}
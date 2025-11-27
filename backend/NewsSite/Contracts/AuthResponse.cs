namespace NewsSite.Contracts
{
    public record AuthResponse(
            string Token,
            string Email,
            string FullName,
            string Role
        );
}

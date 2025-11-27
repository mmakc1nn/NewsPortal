namespace NewsSite.Contracts
{
    public record NewsResponse(
        Guid Id,
        string Title,
        string Content,
        DateTime PublishedTime,
        string Author,
        string? ImageBase64

    );
}

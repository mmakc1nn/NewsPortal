using NewsSite.Core.Models;

namespace NewsSite.DataAccess.Repository
{
    public interface INewsRepository
    {
        Task<List<News>> GetAllNewsAsync();
        Task<News?> GetNewsByIdAsync(Guid id);
        Task AddNewsAsync(News news);
        Task UpdateNewsAsync(News news);
        Task DeleteNewsAsync(Guid id);

        Task<(List<News> news, int totalCount)> GetPagedNewsAsync(int page, int pageSize, string? searchQuery = null);
    }
}
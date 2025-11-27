using NewsSite.Core.Models;

namespace NewsSite.Application.Services
{
    public interface INewsService
    {
        Task AddNews(News news);
        Task DeleteNews(Guid id);
        Task<List<News>> GetAllNews();
        Task<News?> GetNewsById(Guid id);
        Task UpdateNews(News news);

        Task<(List<News> news, int totalCount)> GetPagedNews(int page, int pageSize, string? searchQuery = null);
    }
}
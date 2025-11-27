using NewsSite.Core.Models;
using NewsSite.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.Application.Services
{
    public class NewsService : INewsService
    {

        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }
        public async Task<List<News>> GetAllNews()
        {
            return await _newsRepository.GetAllNewsAsync();
        }

        public async Task<News?> GetNewsById(Guid id)
        {
            return await _newsRepository.GetNewsByIdAsync(id);
        }

        public async Task AddNews(News news)
        {
            await _newsRepository.AddNewsAsync(news);
        }

        public async Task UpdateNews(News news)
        {
            await _newsRepository.UpdateNewsAsync(news);
        }

        public async Task DeleteNews(Guid id)
        {
            await _newsRepository.DeleteNewsAsync(id);
        }

        public async Task<(List<News> news, int totalCount)> GetPagedNews(int page, int pageSize, string? searchQuery = null)
        {
            return await _newsRepository.GetPagedNewsAsync(page, pageSize, searchQuery);
        }

    }
}

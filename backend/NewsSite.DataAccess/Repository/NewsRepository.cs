using Microsoft.EntityFrameworkCore;
using NewsSite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.DataAccess.Repository
{
    public class NewsRepository : INewsRepository
    {
        private readonly NewsSiteDbContext _context;

        public NewsRepository(NewsSiteDbContext context)
        {
            _context = context;
        }

        public async Task<List<News>> GetAllNewsAsync()
        {
            var newsEntities = await _context.News.AsNoTracking().ToListAsync();
            return newsEntities.Select(e => News.Create(e.Id, e.Title, e.Content, e.Author, e.ImageBase64).news).ToList();
        }

        public async Task<News?> GetNewsByIdAsync(Guid id)
        {
            var newsEntity = await _context.News.AsNoTracking().FirstOrDefaultAsync(n => n.Id == id);
            if (newsEntity == null)
            {
                return null;
            }
            return News.Create(newsEntity.Id, newsEntity.Title, newsEntity.Content, newsEntity.Author, newsEntity.ImageBase64).news;
        }

        public async Task AddNewsAsync(News news)
        {
            var newsEntity = new Entities.NewsEntity
            {
                Id = news.Id,
                Title = news.Title,
                Content = news.Content,
                PublishedTime = news.PublishedTime,
                Author = news.Author,
                ImageBase64 = news.ImageBase64
            };
            _context.News.Add(newsEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNewsAsync(News news)
        {
            var newsEntity = await _context.News.FirstOrDefaultAsync(n => n.Id == news.Id);
            if (newsEntity != null)
            {
                newsEntity.Title = news.Title;
                newsEntity.Content = news.Content;
                newsEntity.PublishedTime = news.PublishedTime;
                newsEntity.Author = news.Author;
                newsEntity.ImageBase64 = news.ImageBase64; 
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteNewsAsync(Guid id)
        {
            var newsEntity = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
            if (newsEntity != null)
            {
                _context.News.Remove(newsEntity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<(List<News> news, int totalCount)> GetPagedNewsAsync(int page, int pageSize, string? searchQuery = null)
        {
            var query = _context.News.AsNoTracking().AsQueryable();
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(n => n.Title.Contains(searchQuery) || n.Content.Contains(searchQuery));
            }
            var totalCount = await query.CountAsync();
            var newsEntities = await query
                .OrderByDescending(n => n.PublishedTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var newsList = newsEntities.Select(e => News.Create(e.Id, e.Title, e.Content, e.Author, e.ImageBase64).news).ToList();
            return (newsList, totalCount);
        }
    }
}

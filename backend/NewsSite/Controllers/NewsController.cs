using Microsoft.AspNetCore.Mvc;
using NewsSite.Application.Services;
using NewsSite.Contracts;
using NewsSite.Core.Models;

namespace NewsSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }


        [HttpGet("paged")]
        public async Task<ActionResult<PagedNewsResponse>> GetPagedNews(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = null)
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var (newsItems, totalCount) = await _newsService.GetPagedNews(page, pageSize, search);

            var response = new PagedNewsResponse
            {
                News = newsItems.Select(news => new NewsResponse(
                    news.Id,
                    news.Title,
                    news.Content,
                    news.PublishedTime,
                    news.Author,
                    news.ImageBase64
                )).ToList(),
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<NewsResponse>>> GetAllNews()
        {
            var newsItems = await _newsService.GetAllNews();
            var response = newsItems.Select(news => new NewsResponse(
                news.Id,
                news.Title,
                news.Content,
                news.PublishedTime,
                news.Author,
                news.ImageBase64
            )).ToList();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NewsResponse>> GetNewsById(Guid id)
        {
            var news = await _newsService.GetNewsById(id);
            if (news == null)
            {
                return NotFound();
            }
            var response = new NewsResponse(
                news.Id,
                news.Title,
                news.Content,
                news.PublishedTime,
                news.Author,
                news.ImageBase64
            );
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> AddNews([FromBody] CreateNewsRequest request)
        {
            var (news, error) = Core.Models.News.Create(Guid.NewGuid(), request.Title, request.Content, request.Author, request.ImageBase64);
            if (error != null)
            {
                return BadRequest(error);
            }
            await _newsService.AddNews(news);
            return Ok(news.Id);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateNews(Guid id, [FromBody] UpdateNewsRequest request)
        {
            // Получаем существующую новость
            var existingNews = await _newsService.GetNewsById(id);
            if (existingNews == null)
            {
                return NotFound();
            }

            // Проверяем корректность входных данных
            if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Length > News.MaxTitleLength)
                return BadRequest("Title mismatches the right length.");

            if (string.IsNullOrWhiteSpace(request.Content))
                return BadRequest("Content cannot be empty.");

            // Обновляем поля существующей сущности
            existingNews.Title = request.Title;
            existingNews.Content = request.Content;
            existingNews.Author = request.Author;
            existingNews.ImageBase64 = request.ImageBase64; 

            // Сохраняем изменения через сервис
            await _newsService.UpdateNews(existingNews);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(Guid id)
        {
            var existingNews = await _newsService.GetNewsById(id);
            if (existingNews == null)
            {
                return NotFound();
            }
            await _newsService.DeleteNews(id);
            return NoContent();
        }

    }
}

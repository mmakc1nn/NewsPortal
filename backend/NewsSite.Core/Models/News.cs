using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.Core.Models
{
    public class News
    {
        public const int MaxTitleLength = 200;
        private News(Guid id, string title, string content, string author, string? imageBase64)
        {
            Id = id;
            Title = title;
            Content = content;
            PublishedTime = DateTime.UtcNow;
            Author = author;
            ImageBase64 = imageBase64;
        }

        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublishedTime { get; private set; }
        public string Author { get; set; } = string.Empty;
        public string? ImageBase64 { get; set; }

        public static (News news, string error) Create(Guid id, string title, string content,string author, string? imageBase64 )
        {
            if (string.IsNullOrWhiteSpace(title) || title.Length > MaxTitleLength)
            {
                return (null, "Title mismatches the right length.");
            }
            if (string.IsNullOrWhiteSpace(content))
            {
                return (null, "Content cannot be empty.");
            }
            var news = new News(id, title, content,author, imageBase64);
            return (news, null);
        }
    }
}

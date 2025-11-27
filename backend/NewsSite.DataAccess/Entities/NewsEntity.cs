using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.DataAccess.Entities
{
    public class NewsEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublishedTime { get; set; } = DateTime.UtcNow;
        public string Author { get; set; } = string.Empty;
        public string? ImageBase64 { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace NewsSite.Contracts
{
    public class CreateNewsRequest
    {
        [Required]
        [MaxLength(200)] 
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string Author { get; set; } = string.Empty;
        
        public string? ImageBase64 { get; set; }
    }
}

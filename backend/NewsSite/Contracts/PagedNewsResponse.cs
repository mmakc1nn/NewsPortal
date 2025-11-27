namespace NewsSite.Contracts
{
    public class PagedNewsResponse
    {

        public List<NewsResponse> News { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }
}

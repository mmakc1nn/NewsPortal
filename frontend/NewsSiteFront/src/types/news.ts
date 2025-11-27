export interface News {
  id: string;
  title: string;
  content: string;
  publishedTime: string;
  author: string;
  imageBase64?: string | null;  // Новое поле
}

export interface PagedNewsResponse {
  news: News[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  author: string;
  imageBase64?: string | null;  // Новое поле
}

export interface UpdateNewsRequest {
  title: string;
  content: string;
  author: string;
  imageBase64?: string | null;  // Новое поле
}
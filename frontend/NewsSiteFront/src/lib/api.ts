import { News, PagedNewsResponse, CreateNewsRequest, UpdateNewsRequest } from '@/types/news';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001/api';

// Функция для пагинированного получения новостей с поиском
export async function getPagedNews(page: number = 1, pageSize: number = 10, search?: string): Promise<PagedNewsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  
  if (search) {
    params.append('search', search);
  }
  
  const response = await fetch(`${API_BASE_URL}/News/paged?${params}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Получить все новости
export async function getAllNews(): Promise<News[]> {
  const response = await fetch(`${API_BASE_URL}/News`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Получить одну новость по ID
export async function getNewsById(id: string): Promise<News> {
  const response = await fetch(`${API_BASE_URL}/News/${id}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Создать новость
export async function createNews(data: CreateNewsRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/News`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to create news');
  }
  return response.json(); // Возвращает ID
}

// Обновить новость
export async function updateNews(id: string, data: UpdateNewsRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/News/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to update news');
  }
}

// Удалить новость
export async function deleteNews(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/News/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete news');
}
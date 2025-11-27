// frontend/NewsSiteFront/src/lib/api.ts
import { News, PagedNewsResponse, CreateNewsRequest, UpdateNewsRequest } from '@/types/news';
import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7020/api';

// Получить заголовки с токеном
function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

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

// Создать новость (требует авторизацию)
export async function createNews(data: CreateNewsRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/News`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to create news');
  }
  return response.json();
}

// Обновить новость (требует авторизацию)
export async function updateNews(id: string, data: UpdateNewsRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/News/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to update news');
  }
}

// Удалить новость (требует авторизацию)
export async function deleteNews(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/News/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete news');
}
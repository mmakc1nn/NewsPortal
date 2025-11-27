// frontend/NewsSiteFront/src/lib/auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7020/api';

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

export interface UserInfo {
  email: string;
  fullName: string;
  role: string;
}

// Регистрация
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/Auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

// Вход
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

// Сохранение токена и информации о пользователе
export function saveAuthData(authResponse: AuthResponse) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('userInfo', JSON.stringify({
      email: authResponse.email,
      fullName: authResponse.fullName,
      role: authResponse.role,
    }));
  }
}

// Получение токена
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Получение информации о пользователе
export function getUserInfo(): UserInfo | null {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
  return null;
}

// Проверка, является ли пользователь админом
export function isAdmin(): boolean {
  const userInfo = getUserInfo();
  return userInfo?.role === 'Admin';
}

// Выход
export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAdmin'); // Удаляем старый ключ для совместимости
  }
}

// Проверка аутентификации
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
// frontend/NewsSiteFront/src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserInfo, logout, isAdmin } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Состояния
  const [userInfo, setUserInfo] = useState<{ email: string; fullName: string; role: string } | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Загружаем данные пользователя только на клиенте
  useEffect(() => {
    const user = getUserInfo();
    setUserInfo(user);
    setIsAdminUser(isAdmin());
  }, []);

  const handleLogout = () => {
    logout();
    setUserInfo(null);
    setIsAdminUser(false);
    setShowDropdown(false);
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Левый блок: Логотип и навигация */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
              Новостной портал
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded transition ${pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
              >
                Главная
              </Link>
              <Link 
                href="/news" 
                className={`px-3 py-2 rounded transition ${pathname === '/news' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
              >
                Новости
              </Link>
              {userInfo && isAdminUser && (
                <Link 
                  href="/admin" 
                  className={`px-3 py-2 rounded transition ${pathname.startsWith('/admin') ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  Админ-панель
                </Link>
              )}
            </div>
          </div>

          {/* Правый блок: пользователь */}
          <div className="flex items-center">
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-400 hover:ring-blue-300 transition-all">
                    <span className="text-blue-600 font-bold">{userInfo.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowDropdown(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {userInfo.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{userInfo.fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {userInfo.role === 'Admin' ? 'Администратор' : 'Пользователь'}
                        </div>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center group"
                      >
                        Выйти из аккаунта
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  href="/login"
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 transition"
                >
                  Вход
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

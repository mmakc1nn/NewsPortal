'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Проверяем, залогинен ли админ
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className={`px-3 py-2 rounded transition ${pathname.startsWith('/admin') ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  Админ-панель
                </Link>
              )}
            </div>
          </div>
          
          <div>
            {isAdmin ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
              >
                Выйти
              </button>
            ) : (
              <Link 
                href="/admin/login"
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
              >
                Вход для админа
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
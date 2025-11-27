'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getNewsById } from '@/lib/api';
import { News } from '@/types/news';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const data = await getNewsById(id);
      setNews(data);
    } catch (err) {
      setError('Новость не найдена');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Загрузка новости...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
          <p className="text-xl mb-4">{error || 'Новость не найдена'}</p>
          <Link 
            href="/news"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Вернуться к списку новостей
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(news.publishedTime), 'dd MMMM yyyy, HH:mm', { locale: ru });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Кнопка назад */}
      <Link 
        href="/news"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Назад к новостям
      </Link>

      <article className="max-w-4xl mx-auto">
        {/* Изображение */}
        {news.imageBase64 ? (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={news.imageBase64}
              alt={news.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        ) : (
          <div className="mb-8 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
            <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {news.title}
        </h1>

        {/* Мета-информация */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{news.author}</span>
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formattedDate}
          </span>
        </div>

        {/* Контент */}
        <div className="prose prose-lg max-w-none">
          {news.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Кнопка поделиться / вернуться */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href="/news"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            ← Все новости
          </Link>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Ссылка скопирована!');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Поделиться
          </button>
        </div>
      </article>
    </div>
  );
}
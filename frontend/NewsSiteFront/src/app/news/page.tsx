'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPagedNews } from '@/lib/api';
import { PagedNewsResponse } from '@/types/news';
import NewsCard from '@/components/Newscard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [data, setData] = useState<PagedNewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchNews();
  }, [currentPage, searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPagedNews(currentPage, 9, searchQuery || undefined);
      setData(result);
    } catch (err) {
      setError('Не удалось загрузить новости. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchQuery) params.set('search', searchQuery);
    router.push(`/news?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (query) params.set('search', query);
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Все новости</h1>
      
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Загрузка новостей...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          {searchQuery && (
            <div className="mb-6 text-gray-600">
              Найдено результатов: <span className="font-semibold">{data.totalCount}</span>
              {' для запроса "'}<span className="font-semibold">{searchQuery}</span>"
            </div>
          )}

          {data.news.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-600">Новостей не найдено</p>
              {searchQuery && (
                <button 
                  onClick={() => handleSearch('')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Показать все новости
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.news.map(news => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

              {data.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
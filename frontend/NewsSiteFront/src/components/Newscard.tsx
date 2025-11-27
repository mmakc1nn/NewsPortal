import Link from 'next/link';
import { News } from '@/types/news';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formattedDate = format(new Date(news.publishedTime), 'dd MMMM yyyy, HH:mm', { locale: ru });

  return (
    <Link href={`/news/${news.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Изображение */}
        <div className="h-48 bg-gray-200 overflow-hidden">
          {news.imageBase64 ? (
            <img
              src={news.imageBase64}
              alt={news.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Контент */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition line-clamp-2">
            {news.title}
          </h2>
          <div className="text-sm text-gray-500 mb-4 flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {news.author}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formattedDate}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed line-clamp-3 flex-1">
            {news.content}
          </p>
          <div className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition">
            Читать далее →
          </div>
        </div>
      </div>
    </Link>
  );
}
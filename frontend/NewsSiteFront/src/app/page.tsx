import Link from 'next/link';
import { getPagedNews } from '@/lib/api';
import NewsCard from '@/components/Newscard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let latestNews: any[] = [];
  
  try {
    const data = await getPagedNews(1, 3);
    latestNews = data.news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Добро пожаловать на наш новостной портал
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Самые актуальные и достоверные новости со всего мира
        </p>
        <Link 
          href="/news"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Читать все новости
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Актуальные новости</h3>
          <p className="text-gray-700">Мы публикуем самые свежие новости в режиме реального времени</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Проверенные источники</h3>
          <p className="text-gray-700">Вся информация проходит тщательную проверку перед публикацией</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Широкий охват</h3>
          <p className="text-gray-700">Новости из всех сфер жизни: политика, экономика, спорт, культура</p>
        </div>
      </section>

      {/* Latest News Section */}
      {latestNews.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Последние новости</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/news"
              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              Посмотреть все новости →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
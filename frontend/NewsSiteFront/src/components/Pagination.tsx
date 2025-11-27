interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | string)[] = [];
  
  // Логика отображения страниц
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Предыдущая страница"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Номера страниц */}
      {pages.map((page, index) => (
        page === '...' ? (
          <span key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
            •••
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      {/* Кнопка "Вперёд" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Следующая страница"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
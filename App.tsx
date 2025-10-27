import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from './types';
import { fetchAINews } from './services/geminiService';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import LoadingSkeleton from './components/LoadingSkeleton';

const App: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const news = await fetchAINews();
      setNewsItems(news);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header onRefresh={loadNews} isLoading={isLoading} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96 bg-brand-surface rounded-lg p-8 text-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong.</h2>
            <p className="text-brand-text-secondary max-w-md">{error}</p>
            <button
              onClick={loadNews}
              className="mt-6 px-6 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {newsItems.map((item) => (
              <NewsCard key={item.rank} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
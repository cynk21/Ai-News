
import React from 'react';

interface HeaderProps {
    onRefresh: () => void;
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading }) => {
  return (
    <header className="bg-brand-surface sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-accent rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">
            AI News Aggregator
          </h1>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center justify-center p-2 text-brand-text-secondary hover:text-white hover:bg-brand-primary rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Refresh news"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120 12h-3a6 6 0 00-9.45-4.5L4 4z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

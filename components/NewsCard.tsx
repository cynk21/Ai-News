
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

const SourceLink: React.FC<{ name: string; url: string }> = ({ name, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-brand-primary text-brand-text-secondary text-xs font-semibold px-3 py-1 rounded-full hover:bg-brand-secondary hover:text-white transition-all duration-300"
    >
      {name}
    </a>
  );

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <article className="bg-brand-surface rounded-lg shadow-xl overflow-hidden animate-slide-in-up transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-accent text-white font-bold text-lg shadow-md mr-4">
            {item.rank}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {item.headline}
          </h2>
        </div>
        <p className="text-brand-text-secondary mb-6 leading-relaxed">
          {item.summary}
        </p>
        <div className="border-t border-brand-primary pt-4">
          <h3 className="text-sm font-semibold text-brand-text-primary mb-3">
            Sources:
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.sources.map((source, index) => (
              <SourceLink key={index} name={source.name} url={source.url} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;

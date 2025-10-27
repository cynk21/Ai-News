
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden p-6 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-brand-primary mr-4"></div>
        <div className="h-6 bg-brand-primary rounded w-3/4"></div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-brand-primary rounded w-full"></div>
        <div className="h-4 bg-brand-primary rounded w-5/6"></div>
        <div className="h-4 bg-brand-primary rounded w-3/4"></div>
      </div>
      <div className="border-t border-brand-primary pt-4">
        <div className="h-4 bg-brand-primary rounded w-1/4 mb-3"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-brand-primary rounded-full w-20"></div>
          <div className="h-6 bg-brand-primary rounded-full w-24"></div>
          <div className="h-6 bg-brand-primary rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

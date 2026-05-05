import React from 'react';

export function SkeletonLoader({ count = 1, type = 'text' }: { count?: number, type?: 'text' | 'card' }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-gray-200 rounded-xl ${type === 'card' ? 'h-64' : 'h-4'}`} 
        />
      ))}
    </div>
  );
}

import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
      <Sun size={16} />
    </button>
  );
}

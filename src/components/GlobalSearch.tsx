import React from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <Search className="text-gray-400" />
              <input 
                autoFocus
                placeholder="Search Talibon services, news, ordinances..."
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium"
              />
              <button onClick={onClose}><X /></button>
            </div>
            <div className="p-8 text-center text-gray-400">
              Start typing to search...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ContentPageProps {
  title: string;
  fetchData: () => Promise<any>;
  renderContent: (data: any) => React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, fetchData, renderContent }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchData();
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  return (
    <div className="pt-32 md:pt-44 pb-20 min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Liquid UI Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase border-l-8 border-blue-600 pl-6">
            {title}
          </h1>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl font-bold">
              {error}
            </div>
          ) : (data && (!Array.isArray(data) || data.length > 0)) ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-blue-50">
              {renderContent(data)}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-blue-50 text-center text-gray-500 font-bold">
              No content available.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContentPage;

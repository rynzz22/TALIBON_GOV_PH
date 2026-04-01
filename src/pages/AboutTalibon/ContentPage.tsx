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
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase border-l-8 border-blue-600 pl-6">
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
          ) : (
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-blue-50">
              {renderContent(data)}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContentPage;

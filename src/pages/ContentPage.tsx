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
    <div className="pt-32 md:pt-44 pb-20 min-h-screen bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-16">
            <span className="section-label">Information</span>
            <h1 className="section-title">
              {title}
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl font-bold shadow-sm">
              {error}
            </div>
          ) : (data && (!Array.isArray(data) || data.length > 0)) ? (
            <div className="min-h-[400px]">
              {renderContent(data)}
            </div>
          ) : (
            <div className="py-24 text-center text-brand-muted font-bold uppercase tracking-widest">
              No content available at this time.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContentPage;

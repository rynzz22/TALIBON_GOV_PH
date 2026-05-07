import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ContentManager() {
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await api.getAllContent();
      setContentItems(data || []);
    } catch (err) {
      console.error('Failed to fetch content', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      await api.deleteContent(slug);
      fetchContent();
    } catch (err) {
      console.error('Failed to delete content', err);
      alert('Error deleting content');
    }
  };

  if (loading) {
    return <div className="p-8 text-brand-muted font-bold uppercase tracking-widest animate-pulse">Loading content...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-text uppercase tracking-tight">Content Pages</h1>
          <p className="text-brand-muted font-medium mt-1">Manage all dynamic pages on the site.</p>
        </div>
        <Link
          to="/admin/content/new"
          className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          Create New Page
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-surface border-b border-brand-border">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-brand-muted uppercase tracking-widest">Title</th>
              <th className="px-6 py-4 text-[10px] font-black text-brand-muted uppercase tracking-widest">Slug (URL)</th>
              <th className="px-6 py-4 text-[10px] font-black text-brand-muted uppercase tracking-widest">Last Updated</th>
              <th className="px-6 py-4 text-[10px] font-black text-brand-muted uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {contentItems.map((item) => (
              <tr key={item.id} className="hover:bg-brand-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-brand-text">{item.title}</div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">/{item.slug}</code>
                </td>
                <td className="px-6 py-4 text-sm text-brand-muted font-medium">
                  {new Date(item.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/admin/content/${item.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.slug)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contentItems.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-brand-muted font-medium">
                  No content pages found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

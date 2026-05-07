import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowLeft, Save } from 'lucide-react';

export default function ContentEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isNew = slug === 'new';

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    subtitle: '',
    markdownContent: ''
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew && slug) {
      fetchContent(slug);
    }
  }, [slug, isNew]);

  const fetchContent = async (contentSlug: string) => {
    try {
      const data = await api.getContent(contentSlug);
      if (data) {
        setFormData({
          slug: data.slug,
          title: data.title,
          subtitle: data.body?.subtitle || '',
          markdownContent: typeof data.body?.content === 'string' ? data.body.content : JSON.stringify(data.body?.sections, null, 2)
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      alert('Slug and Title are required');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const payload = {
        slug: formData.slug,
        title: formData.title,
        body: {
          subtitle: formData.subtitle,
          content: formData.markdownContent
        }
      };

      if (isNew) {
        await api.createContent(payload);
      } else {
        await api.updateContent(slug!, payload);
      }
      
      navigate('/admin/content');
    } catch (err: any) {
      setError(err.message || 'Failed to save content');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-brand-muted font-bold uppercase tracking-widest animate-pulse">Loading editor...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/content" className="p-3 bg-white rounded-xl border border-brand-border hover:bg-brand-surface transition-colors">
          <ArrowLeft size={20} className="text-brand-text" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-brand-text uppercase tracking-tight">
            {isNew ? 'Create New Page' : 'Edit Page'}
          </h1>
          <p className="text-brand-muted font-medium mt-1">Write your content using Markdown</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold uppercase tracking-widest mb-6 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Area */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-brand-border shadow-sm">
          <div>
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">Page Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. History of Talibon"
              className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">Markdown Content</label>
            <textarea
              name="markdownContent"
              value={formData.markdownContent}
              onChange={handleChange}
              rows={20}
              placeholder="# Heading 1&#10;&#10;Write your content here..."
              className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text font-medium font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm">
            <h3 className="text-sm font-black text-brand-text uppercase tracking-widest mb-4 border-b border-brand-border pb-4">Page Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">URL Slug</label>
                <div className="flex">
                  <span className="px-3 py-3 bg-brand-surface border border-r-0 border-brand-border rounded-l-xl text-brand-muted text-sm font-mono flex items-center">
                    /page/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="history"
                    disabled={!isNew}
                    className="flex-1 min-w-0 px-4 py-3 bg-brand-surface border border-brand-border rounded-r-xl text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
                <p className="text-[10px] text-brand-muted mt-2 font-medium">The unique identifier for the URL. Letters, numbers, and dashes only.</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">Subtitle (Optional)</label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

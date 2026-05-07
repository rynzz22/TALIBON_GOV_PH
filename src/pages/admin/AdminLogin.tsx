import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    try {
      await signInWithEmail(email, password);
      navigate('/admin');
    } catch (err: any) {
      setLocalError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-brand-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-brand-border p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-brand-text uppercase tracking-tight text-center">
            Admin Access
          </h1>
          <p className="text-sm text-brand-muted font-medium mt-2 text-center">
            Log in to access the Talibon CMS
          </p>
        </div>

        {localError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold uppercase tracking-widest mb-6">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="admin@talibon.gov.ph"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-white py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

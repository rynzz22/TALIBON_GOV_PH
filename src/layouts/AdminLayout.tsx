import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SupabaseAuthContext';
import { LayoutDashboard, FileText, Settings, LogOut, FilePlus } from 'lucide-react';

export default function AdminLayout() {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="flex h-screen bg-brand-surface pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-border flex flex-col hidden md:flex h-full">
        <div className="p-6 border-b border-brand-border">
          <h2 className="text-xl font-black text-brand-text uppercase tracking-tight">Admin CMS</h2>
          <p className="text-xs text-brand-muted mt-1 font-medium">Welcome back, Admin</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-brand-primary text-white' : 'text-brand-muted hover:bg-brand-surface hover:text-brand-text'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/admin/content"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-brand-primary text-white' : 'text-brand-muted hover:bg-brand-surface hover:text-brand-text'
              }`
            }
          >
            <FileText size={18} />
            Content Pages
          </NavLink>

          <NavLink
            to="/admin/news"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'bg-brand-primary text-white' : 'text-brand-muted hover:bg-brand-surface hover:text-brand-text'
              }`
            }
          >
            <FilePlus size={18} />
            News & Updates
          </NavLink>
        </nav>

        <div className="p-4 border-t border-brand-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

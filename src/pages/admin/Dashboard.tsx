import React from 'react';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { FileText, Users, Activity, FilePlus } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Pages', value: '12', icon: FileText },
    { label: 'News Articles', value: '45', icon: FilePlus },
    { label: 'Admin Users', value: '3', icon: Users },
    { label: 'Recent Activity', value: 'High', icon: Activity },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-text uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-brand-muted font-medium mt-2">
          Welcome back, {profile?.full_name || 'Admin'}. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center text-brand-primary">
                <stat.icon size={20} />
              </div>
            </div>
            <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className="text-3xl font-black text-brand-text">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-8 text-center">
        <h2 className="text-xl font-black text-brand-text uppercase tracking-tight mb-2">System Status Normal</h2>
        <p className="text-brand-muted font-medium">All systems are running smoothly. Navigate to the Content Pages or News section to make updates.</p>
      </div>
    </div>
  );
}

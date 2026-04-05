import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://ngsnyjrxvqyhrbnjxwyw.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc255anJ4dnF5aHJibmp4d3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NDUyNTQsImV4cCI6MjA5MDUyMTI1NH0.md7q71ZDAC22kl-cRmBtu1rmjnGgpxAF6nDG6UOyxWQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

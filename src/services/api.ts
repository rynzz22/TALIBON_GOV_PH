
import { supabase } from '../lib/supabase';
import { CACHE_DURATION } from '../constants';

const cache = new Map<string, { data: any; timestamp: number }>();

export const api = {
  async getContent(slug: string) {
    const cacheKey = `content:${slug}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    
    if (data) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
    }
    
    return data;
  },

  async getNews(category?: string, limit = 10) {
    let query = supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getBarangayStats() {
    const { data, error } = await supabase
      .from('barangay_stats')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }
};

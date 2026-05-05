
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'municipal_admin' | 'barangay_admin';
  barangay_id: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  category: string;
  image_url: string | null;
  file_url: string | null;
  date: string;
  barangay_id: string | null;
  author_id: string;
  created_at: string;
}

export interface ContentSection {
  slug: string;
  title: string;
  body: any;
  updated_at: string;
}

export interface BarangayStat {
  id: string;
  slug: string;
  name: string;
  population: string | null;
  captain: string | null;
  description: string | null;
  updated_at: string;
}

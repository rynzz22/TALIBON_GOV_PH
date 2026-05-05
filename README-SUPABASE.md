# Supabase Migration for Talibon Portal

Follow these steps to migrate your content to Supabase.

## 1. SQL Schema

Execute the following SQL in your Supabase SQL Editor:

```sql
-- 1. Table for general content
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  body JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for barangay officials
CREATE TABLE IF NOT EXISTS barangay_officials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barangay_id TEXT NOT NULL,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table for news & events
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  file_url TEXT,
  barangay_id TEXT, -- NULL for municipal news
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table for resolutions
CREATE TABLE IF NOT EXISTS resolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  no TEXT NOT NULL,
  date DATE NOT NULL,
  author TEXT,
  title TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table for ordinances
CREATE TABLE IF NOT EXISTS ordinances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  file_url TEXT,
  file_size TEXT,
  barangay_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table for municipal officials (Admin level)
CREATE TABLE IF NOT EXISTS officials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  level INTEGER DEFAULT 3,
  display_order INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Table for navigation links
CREATE TABLE IF NOT EXISTS navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  section TEXT DEFAULT 'NEWS',
  "order" INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT false,
  is_hash BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Table for barangay statistics
CREATE TABLE IF NOT EXISTS barangay_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  population TEXT,
  captain TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Table for legislative reports
CREATE TABLE IF NOT EXISTS legislative_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  report_type TEXT DEFAULT 'MINUTES',
  date DATE NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Table for transparency documents
CREATE TABLE IF NOT EXISTS transparency_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'BUDGET',
  year INTEGER NOT NULL,
  file_url TEXT,
  file_size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE barangay_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE resolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordinances ENABLE ROW LEVEL SECURITY;
ALTER TABLE officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE barangay_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE legislative_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transparency_documents ENABLE ROW LEVEL SECURITY;

-- 12. Create policies for public read access
CREATE POLICY "Public Read Access Content" ON content FOR SELECT USING (true);
CREATE POLICY "Public Read Access Barangay Officials" ON barangay_officials FOR SELECT USING (true);
CREATE POLICY "Public Read Access News" ON news FOR SELECT USING (true);
CREATE POLICY "Public Read Access Resolutions" ON resolutions FOR SELECT USING (true);
CREATE POLICY "Public Read Access Ordinances" ON ordinances FOR SELECT USING (true);
CREATE POLICY "Public Read Access Officials" ON officials FOR SELECT USING (true);
CREATE POLICY "Public Read Access Navigation" ON navigation FOR SELECT USING (true);
CREATE POLICY "Public Read Access Barangay Stats" ON barangay_stats FOR SELECT USING (true);
CREATE POLICY "Public Read Access Legislative" ON legislative_reports FOR SELECT USING (true);
CREATE POLICY "Public Read Access Transparency" ON transparency_documents FOR SELECT USING (true);

-- 13. Create policies for admin write access (requires authentication)
-- (Simplified for migration, should be hardened with roles in production)
CREATE POLICY "Authenticated Write Access Content" ON content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Barangay Officials" ON barangay_officials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access News" ON news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Resolutions" ON resolutions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Ordinances" ON ordinances FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Officials" ON officials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Navigation" ON navigation FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Barangay Stats" ON barangay_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Legislative" ON legislative_reports FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Access Transparency" ON transparency_documents FOR ALL USING (auth.role() = 'authenticated');
```

## 2. Environment Variables

Ensure you have the following in your `.env` file (or set in your environment):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key (optional, for migration script)
```

## 3. Run Migration Script

You can run the migration script to populate the initial data:

```bash
npx tsx scripts/migrate-content.ts
```

-- TALIBON DIGITAL CORE: SAFE SCHEMA UPDATE
-- This script uses "IF NOT EXISTS" to skip existing tables and prevent errors.

-- 1. Profiles (RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'barangay_admin' CHECK (role IN ('municipal_admin', 'barangay_admin')),
  barangay_id TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. News/Articles
CREATE TABLE IF NOT EXISTS public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  file_url TEXT,
  date DATE DEFAULT CURRENT_DATE,
  barangay_id TEXT,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Ordinances
CREATE TABLE IF NOT EXISTS public.ordinances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  no TEXT NOT NULL,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  date_enacted DATE,
  pdf_url TEXT,
  barangay_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Resolutions
CREATE TABLE IF NOT EXISTS public.resolutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  no TEXT NOT NULL,
  title TEXT NOT NULL,
  date DATE,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Officials
CREATE TABLE IF NOT EXISTS public.officials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  level INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,
  barangay_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Navigation
CREATE TABLE IF NOT EXISTS public.navigation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  section TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT FALSE
);

-- 7. Content (Static Sections)
CREATE TABLE IF NOT EXISTS public.content (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Meetings
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  transcription TEXT,
  author TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. GAD Beneficiaries
CREATE TABLE IF NOT EXISTS public.gad_beneficiaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  unique_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('Male', 'Female', 'Other')),
  birthdate DATE,
  age INTEGER,
  barangay_id TEXT NOT NULL,
  civil_status TEXT CHECK (civil_status IN ('Single', 'Married', 'Widowed', 'Separated', 'Common-law')),
  sectoral_classification TEXT[],
  contact_info TEXT,
  encoded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Barangay Stats
CREATE TABLE IF NOT EXISTS public.barangay_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  population TEXT,
  captain TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Barangay Officials
CREATE TABLE IF NOT EXISTS public.barangay_officials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  body JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Transparency Documents
CREATE TABLE IF NOT EXISTS public.transparency_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  file_size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Legislative Reports
CREATE TABLE IF NOT EXISTS public.legislative_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Barangays (CMS-managed: captains, population, themes)
CREATE TABLE IF NOT EXISTS public.barangays (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  captain TEXT,
  population TEXT,
  theme_primary TEXT DEFAULT '#0f4c81',
  theme_secondary TEXT DEFAULT '#f5f5f5',
  theme_accent TEXT DEFAULT '#ffb703',
  seal_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Services (Citizen Charter - CMS-managed permits/requirements)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  processing_time TEXT NOT NULL,
  office TEXT NOT NULL,
  category TEXT DEFAULT 'permit', -- permit, certificate, registration
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Tourism Items (CMS-managed spots, festivities, delicacies)
CREATE TABLE IF NOT EXISTS public.tourism_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- spot, festival, delicacy, product
  image_url TEXT,
  date_info TEXT, -- for festivals/events
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraints for CMS tables (safe to run multiple times)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'services_name_unique') THEN
        ALTER TABLE public.services ADD CONSTRAINT services_name_unique UNIQUE (name);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tourism_items_name_unique') THEN
        ALTER TABLE public.tourism_items ADD CONSTRAINT tourism_items_name_unique UNIQUE (name);
    END IF;
END $$;

-- Enable RLS on all (Safe to run multiple times)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ordinances ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.resolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.gad_beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.barangay_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.barangay_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.transparency_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.legislative_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.barangays ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tourism_items ENABLE ROW LEVEL SECURITY;

-- Note: Policies are not idempotent by default.
-- If you see "policy already exists" errors, you can safely ignore them
-- as it means your existing security rules are already active.

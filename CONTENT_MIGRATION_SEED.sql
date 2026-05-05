-- ================================================================================
-- MUNICIPALITY OF TALIBON - CMS CONTENT SEED SCRIPT
-- ================================================================================

-- 1. Ensure Table Exists
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seed Data
INSERT INTO content (slug, title, body) VALUES 

-- ABOUT: HISTORY
('about-history', 'Historical Background of Talibon', '{
  "subtitle": "Founded in 1830, Talibon is a town rich in history and cultural heritage.",
  "sections": [
    {
      "id": "early-years",
      "title": "01. The Founding Years",
      "content": [
        { 
          "subTitle": "Establishment", 
          "items": [
            "Official establishment as a town in 1830.",
            "Named after the gold mining tool ''Talibong'' or ''Talibon''.",
            "Originally part of the larger administrative district of Bohol under Spanish rule."
          ] 
        }
      ]
    },
    {
      "id": "heritage",
      "title": "02. Cultural Heritage",
      "content": [
        { 
          "subTitle": "Religious Significance", 
          "items": [
            "Home to the Blessed Trinity Cathedral.",
            "Strong traditions of faith and resilience passed through generations.",
            "Annual fiesta celebration in honor of the Blessed Trinity."
          ] 
        }
      ]
    }
  ]
}'),

-- ABOUT: VISION & MISSION
('about-vision-mission', 'Vision, Mission & Goals', '{
  "subtitle": "Our roadmap for a progressive, inclusive, and sustainable Talibon.",
  "sections": [
    {
      "id": "vision",
      "title": "Our Vision",
      "content": [
        { 
          "subTitle": "The Future of Talibon", 
          "items": [
            "A premier eco-tourism destination in Northern Bohol.",
            "A hub for sustainable agriculture and fishery.",
            "A God-centered, empowered, and resilient community living in a balanced environment."
          ] 
        }
      ]
    },
    {
      "id": "mission",
      "title": "Our Mission",
      "content": [
        { 
          "subTitle": "Strategic Objectives", 
          "items": [
            "To promote inclusive economic growth through efficient local governance.",
            "To protect and preserve our natural and marine resources for future generations.",
            "To provide high-quality social services and infrastructure to all constituents."
          ] 
        }
      ]
    }
  ]
}'),

-- ABOUT: BARANGAYS
('about-barangays', 'List of Barangays', '{
  "subtitle": "Talibon is composed of 25 vibrant barangays, each with its unique character.",
  "sections": [
    {
      "id": "barangays",
      "title": "Political Subdivisions",
      "content": [
        { 
          "subTitle": "Our Local Communities", 
          "items": [
            "Bagacay", "Balintawak", "Burgos", "Busalian", "Calituban",
            "Cataban", "Guindacpan", "Magsaysay", "Mahanay", "Nocnocan",
            "Poblacion", "San Agustin", "San Francisco", "San Isidro",
            "San Jose", "San Roque", "Santo Nino", "Sikatuna",
            "Tanghaligue", "Zamora"
          ] 
        }
      ]
    }
  ]
}')

ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title, 
  body = EXCLUDED.body,
  updated_at = NOW();

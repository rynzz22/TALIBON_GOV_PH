-- SAFE SEED DATA FOR CMS-MANAGED CONTENT
-- Uses INSERT ... ON CONFLICT to prevent duplicate key errors

-- Seed Barangays (from barangayConfig.ts)
INSERT INTO public.barangays (id, name, slug, description, captain, population, theme_primary, theme_secondary, theme_accent) VALUES
('poblacion', 'Barangay Poblacion', 'poblacion', 'The urban center and seat of commerce in Talibon.', 'Hon. Juan Dela Cruz', '5,420', '#0f4c81', '#f5f5f5', '#ffb703'),
('san-jose', 'Barangay San Jose', 'san-jose', 'A thriving agricultural community in the heart of Talibon.', 'Hon. Maria Santos', '3,150', '#1a4731', '#f8f9fa', '#bc6c25'),
('san-roque', 'Barangay San Roque', 'san-roque', 'Known for its coastal beauty and vibrant fishing community.', 'Hon. Pedro Reyes', '4,200', '#2c5f2d', '#ffffff', '#ff6b35'),
('san-isidro', 'Barangay San Isidro', 'san-isidro', 'A peaceful residential area with rich cultural heritage.', 'Hon. Ana Cruz', '2,800', '#8b4513', '#f5f5dc', '#daa520'),
('san-antonio', 'Barangay San Antonio', 'san-antonio', 'Home to traditional crafts and local artisans.', 'Hon. Jose Garcia', '3,900', '#4b0082', '#e6e6fa', '#9370db'),
('sikatuna', 'Barangay Sikatuna', 'sikatuna', 'Named after the legendary Datu Sikatuna, a historical landmark.', 'Hon. Maria Clara', '4,100', '#b22222', '#fff8dc', '#ffd700'),
('suba', 'Barangay Suba', 'suba', 'A coastal barangay known for its pristine beaches.', 'Hon. Roberto Santos', '2,600', '#006994', '#e0f6ff', '#00bfff'),
('tanghaligue', 'Barangay Tanghaligue', 'tanghaligue', 'An agricultural hub producing quality crops.', 'Hon. Elena Reyes', '3,700', '#228b22', '#f0fff0', '#32cd32'),
('cataban', 'Barangay Cataban', 'cataban', 'Rich in marine resources and fishing traditions.', 'Hon. Miguel Cruz', '4,500', '#000080', '#f0f8ff', '#4169e1'),
('bagacay', 'Barangay Bagacay', 'bagacay', 'A progressive community with modern amenities.', 'Hon. Sofia Garcia', '3,200', '#8b008b', '#faf0e6', '#da70d6'),
('bongan', 'Barangay Bongan', 'bongan', 'Famous for its beautiful sandbar and eco-tourism.', 'Hon. Antonio Reyes', '2,900', '#daa520', '#fffacd', '#ffd700'),
('bugho', 'Barangay Bugho', 'bugho', 'A mountainous area with scenic views and fresh produce.', 'Hon. Carmen Santos', '3,400', '#556b2f', '#f5fffa', '#9acd32'),
('cabacnitan', 'Barangay Cabacnitan', 'cabacnitan', 'Known for its historical significance and landmarks.', 'Hon. Ricardo Cruz', '2,700', '#696969', '#f5f5f5', '#c0c0c0'),
('cambanac', 'Barangay Cambanac', 'cambanac', 'A developing area with growing infrastructure.', 'Hon. Teresa Garcia', '4,300', '#800080', '#e6e6fa', '#dda0dd'),
('cambanil', 'Barangay Cambanil', 'cambanil', 'Rich in natural resources and biodiversity.', 'Hon. Francisco Reyes', '3,100', '#008000', '#f0fff0', '#00ff00'),
('cambulo', 'Barangay Cambulo', 'cambulo', 'A peaceful inland community with strong traditions.', 'Hon. Gloria Santos', '2,800', '#8b4513', '#deb887', '#f4a460'),
('can-olin', 'Barangay Can-olin', 'can-olin', 'Known for its educational institutions and scholars.', 'Hon. Roberto Cruz', '3,600', '#0000cd', '#e6e6fa', '#4682b4'),
('canmaya-diut', 'Barangay Canmaya Diut', 'canmaya-diut', 'A coastal area with rich marine life.', 'Hon. Maria Garcia', '4,000', '#20b2aa', '#e0ffff', '#5f9ea0'),
('canmaya-uno', 'Barangay Canmaya Uno', 'canmaya-uno', 'Home to various marine-related industries.', 'Hon. Pedro Santos', '3,800', '#008b8b', '#e0ffff', '#48d1cc'),
('canmaya-dos', 'Barangay Canmaya Dos', 'canmaya-dos', 'A fishing community with deep maritime roots.', 'Hon. Ana Reyes', '3,500', '#00ced1', '#e0ffff', '#40e0d0'),
('canmaya-tres', 'Barangay Canmaya Tres', 'canmaya-tres', 'Known for its seafood processing facilities.', 'Hon. Jose Cruz', '4,200', '#00ffff', '#e0ffff', '#00ffff'),
('mahaway', 'Barangay Mahaway', 'mahaway', 'An island barangay accessible by boat.', 'Hon. Elena Garcia', '1,800', '#ff6347', '#fff5ee', '#ff7f50'),
('mazawalo', 'Barangay Mazawalo', 'mazawalo', 'A remote island with untouched natural beauty.', 'Hon. Miguel Reyes', '1,200', '#ff4500', '#fff8dc', '#ff6347'),
('poblacion-district-i', 'Barangay Poblacion District I', 'poblacion-district-i', 'Central business district of Talibon.', 'Hon. Sofia Cruz', '6,100', '#dc143c', '#ffe4e1', '#ff1493'),
('poblacion-district-ii', 'Barangay Poblacion District II', 'poblacion-district-ii', 'Educational and administrative center.', 'Hon. Antonio Garcia', '5,800', '#b22222', '#ffe4e1', '#dc143c')
ON CONFLICT (id) DO NOTHING;

-- Seed Services (from citizenCharterData.ts)
INSERT INTO public.services (name, requirements, processing_time, office, category) VALUES
('Business Permit', ARRAY[
  'Duly accomplished Application Form',
  'DTI Registration (for Sole Proprietorship) or SEC Registration (for Corporations)',
  'Barangay Clearance for Business',
  'Lease Contract (if renting) or Tax Declaration/Title (if owned)',
  'Sketch/Map of Business Location',
  'Public Liability Insurance',
  'Fire Safety Inspection Certificate',
  'Sanitary Permit'
], '1-3 Working Days (via e-BOSS)', 'Business Permit and Licensing Office (BPLO)', 'permit'),
('Building Permit', ARRAY[
  'Duly accomplished Application Forms (Building, Sanitary, Electrical, etc.)',
  'Five (5) sets of Plans/Blueprints signed by licensed Architects/Engineers',
  'Certified True Copy of TCT/Land Title',
  'Tax Declaration and Current Tax Receipt',
  'Barangay Clearance for Construction',
  'Environmental Compliance Certificate (if applicable)'
], '7-15 Working Days', 'Office of the Municipal Engineer', 'permit'),
('Mayor''s Clearance', ARRAY[
  'CEDULA (Community Tax Certificate)',
  'Police Clearance (Current)',
  'Official Receipt from Municipal Treasurer'
], '15-30 Minutes', 'Office of the Municipal Mayor', 'certificate'),
('Civil Registry (Birth Certificate)', ARRAY[
  'Drafted Birth Certificate from Hospital/Clinic',
  'Marriage Contract of Parents',
  'Valid ID of Informant'
], '1 Working Day', 'Office of the Local Civil Registrar', 'certificate'),
('Real Property Tax (Amillaramiento)', ARRAY[
  'Previous Year''s Tax Receipt',
  'Tax Declaration (for new assessment)'
], 'Same Day', 'Municipal Treasurer''s Office', 'certificate'),
('Zoning Clearance', ARRAY[
  'Duly accomplished Application Form',
  'Site Development Plan',
  'Vicinity Map',
  'Tax Declaration and Current Tax Receipt',
  'Barangay Clearance'
], '3-5 Working Days', 'Office of the Municipal Planning and Development Coordinator', 'clearance'),
('Health Certificate', ARRAY[
  'Medical Certificate from Physician',
  'Valid ID',
  'Barangay Clearance'
], 'Same Day', 'Rural Health Unit', 'certificate'),
('Sanitary Permit', ARRAY[
  'Duly accomplished Application Form',
  'Sketch/Map of Establishment',
  'Barangay Clearance',
  'Fire Safety Inspection Certificate (if applicable)'
], '1-2 Working Days', 'Office of the Municipal Health Officer', 'permit')
ON CONFLICT (name) DO NOTHING;

-- Seed Tourism Items (from tourism.service.ts)
INSERT INTO public.tourism_items (name, description, category, image_url, date_info) VALUES
('Talibon Cathedral', 'The seat of the Diocese of Talibon, featuring beautiful colonial architecture and religious significance.', 'spot', 'https://picsum.photos/seed/cathedral/800/600', NULL),
('Bongan Sandbar', 'A beautiful sandbar perfect for swimming, relaxation, and water activities in a pristine coastal setting.', 'spot', 'https://picsum.photos/seed/sandbar/800/600', NULL),
('Talibon Strings of Fiesta', 'A vibrant celebration featuring colorful parades, cultural performances, and community festivities.', 'festival', NULL, 'May'),
('Foundation Day and Town Fiesta', 'Annual celebration commemorating Talibon''s founding with religious processions and local traditions.', 'festival', NULL, 'April 22'),
('Abundayon Festival', 'A unique festival celebrating Talibon''s maritime heritage with boat races and seafood festivals.', 'festival', NULL, 'May'),
('Tatak Talibon Products', 'Authentic local products including handicrafts, delicacies, and traditional items made by Talibon artisans.', 'product', NULL, NULL),
('Fresh Seafood', 'Premium quality seafood products including fresh catch, processed items, and specialty dishes from Bohol''s Seafood Capital.', 'delicacy', NULL, NULL)
ON CONFLICT (name) DO NOTHING;
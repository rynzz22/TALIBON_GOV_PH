
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { BARANGAYS } from '../src/constants/barangayConfig';
import { citizenCharterData } from '../src/lib/citizenCharterData';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialContent = [
  {
    slug: 'about',
    body: {
      description: "Talibon is a testament to resilience and the bounty of the sea. As the Seafood Capital of Bohol, we bridge our rich history with a digital-first future.",
      vision: "To be a premier center of commerce and eco-tourism in Northern Bohol.",
      mission: "Empowering citizens through sustainable development and digital governance.",
      mayor: {
        name: "Hon. Janette Aurestila-Garcia",
        title: "Municipal Mayor",
        image: "https://talibon.gov.ph/wp-content/themes/yootheme/cache/28/MUNICIPAL-Mayoe2-28d8fb46.webp"
      }
    }
  },
  {
    slug: 'about-profile',
    body: {
      title: "Municipal Profile",
      content: "Talibon is a 1st class municipality that lies in the northernmost part of the island Province of Bohol in Central Visayas, Philippines.\n\nIts coastline has significant patches of the Danajon Bank, the only documented double barrier reef in the Philippines that is teeming with bountiful natural marine resources. Hence, Talibon is considered as the official Seafood Capital of Bohol.\n\nThe municipality is bounded on the North by the Camotes Sea, South by Trinidad, East by Bien Unido, West by Getafe, and Southwest by Buenavista."
    }
  },
  {
    slug: 'about-barangays',
    body: {
      data: BARANGAYS
    }
  },
  {
    slug: 'transparency-citizen-charter',
    body: {
      data: citizenCharterData
    }
  }
];

const initialNews = [
  {
    title: "Talibon Launches New Digital Portal",
    category: "Government",
    summary: "The municipality transitions to a digital-first approach for better citizen engagement.",
    date: new Date().toISOString().split('T')[0],
    image_url: "https://picsum.photos/seed/talibon1/800/600"
  },
  {
    title: "Seafood Festival 2024 Preparations Underway",
    category: "Tourism",
    summary: "Talibon gears up for its annual celebration of marine abundance.",
    date: new Date().toISOString().split('T')[0],
    image_url: "https://picsum.photos/seed/talibon2/800/600"
  },
  {
    title: "Island Barangay Health Mission Success",
    category: "Health",
    summary: "Medical teams reached outlying island communities for regular checkups.",
    date: new Date().toISOString().split('T')[0],
    image_url: "https://picsum.photos/seed/talibon3/800/600"
  }
];

// Add more slugs as needed based on src/constants/index.ts
const otherSlugs = [
  'about-seal', 'about-history', 'about-mayors', 'about-departments', 
  'about-vicinity-map', 'about-industry', 'about-services', 'about-hymn', 
  'about-demographics', 'about-location', 'executive-mandate', 
  'executive-vision-mission', 'executive-chart', 'executive-directory', 
  'executive-gad-ims', 'legislative-mandate', 'legislative-structure',
  'transparency-full-disclosure', 'transparency-infrastructure', 
  'transparency-finance-reports', 'transparency-executive-orders', 
  'transparency-budget', 'transparency-biddings', 'tourism-spots', 
  'tourism-festivities', 'tourism-delicacies', 'forms-business-permits', 
  'forms-building-permits', 'forms-zoning-clearance'
];

async function migrate() {
  console.log('Starting migration to Supabase...');

  for (const item of initialContent) {
    console.log(`Migrating content for slug: ${item.slug}`);
    const { error } = await supabase
      .from('content')
      .upsert({ 
        slug: item.slug, 
        body: item.body,
        updated_at: new Date().toISOString() 
      }, { onConflict: 'slug' });

    if (error) {
      console.error(`Error migrating ${item.slug}:`, error.message);
    } else {
      console.log(`Successfully migrated ${item.slug}`);
    }
  }

  // Create placeholders for other slugs if they don't exist
  for (const slug of otherSlugs) {
    if (initialContent.find(c => c.slug === slug)) continue;
    
    const { data } = await supabase.from('content').select('slug').eq('slug', slug).maybeSingle();
    if (!data) {
      console.log(`Creating placeholder for slug: ${slug}`);
      await supabase.from('content').insert({
        slug,
        body: { content: `Placeholder for ${slug}`, data: [] }
      });
    }
  }

  console.log('Migrating sample news...');
  for (const item of initialNews) {
    const { data: existing } = await supabase.from('news').select('id').eq('title', item.title).maybeSingle();
    if (!existing) {
      console.log(`Inserting news: ${item.title}`);
      const { error } = await supabase.from('news').insert(item);
      if (error) console.error(`Error inserting news ${item.title}:`, error.message);
    }
  }

  console.log('Migrating barangay stats...');
  for (const brgy of BARANGAYS) {
    console.log(`Migrating stats for: ${brgy.name}`);
    const { error } = await supabase
      .from('barangay_stats')
      .upsert({
        slug: brgy.slug,
        name: brgy.name,
        population: brgy.population,
        captain: brgy.captain,
        description: brgy.description
      }, { onConflict: 'slug' });
    
    if (error) console.error(`Error migrating stats for ${brgy.slug}:`, error.message);
  }

  console.log('Migration completed!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

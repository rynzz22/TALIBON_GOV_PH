export interface BarangayConfigItem {
  slug: string;
  name: string;
  population: number;
  captain: string;
  description: string;
}

// Fallback barangay data used by migration and CMS placeholders.
export const BARANGAYS: BarangayConfigItem[] = [
  {
    slug: 'poblacion',
    name: 'Poblacion',
    population: 0,
    captain: 'TBD',
    description: 'Central barangay profile placeholder.',
  },
];

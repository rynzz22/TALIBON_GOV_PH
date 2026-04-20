import { supabase } from "../lib/supabase";

const api = {
  get: async (table: string, slug: string) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.warn(`Query failed for ${table}/${slug}:`, error.message);
      // Return empty structure to prevent crashes if content not yet seeded
      return { data: { content: "", title: "", timeline: [], breakdown: [] } };
    }
    return { data: data.body || data };
  },
};

export const aboutApi = {
  getProfile: () => api.get("content", "about-profile"),
  getSeal: () => api.get("content", "about-seal"),
  getHistory: () => api.get("content", "about-history"),
  getMayors: () => api.get("content", "about-mayors"),
  getDepartments: () => api.get("content", "about-departments"),
  getVicinityMap: () => api.get("content", "about-vicinity-map"),
  getBarangays: () => api.get("content", "about-barangays"),
  getIndustry: () => api.get("content", "about-industry"),
  getServices: () => api.get("content", "about-services"),
  getHymn: () => api.get("content", "about-hymn"),
  getDemographics: () => api.get("content", "about-demographics"),
  getLocation: () => api.get("content", "about-location"),
};

export const executiveApi = {
  getMandate: () => api.get("content", "executive-mandate"),
  getVisionMission: () => api.get("content", "executive-vision-mission"),
  getChart: () => api.get("content", "executive-chart"),
  getDirectory: () => api.get("content", "executive-directory"),
  getGadIms: () => api.get("content", "executive-gad-ims"),
};

export const legislativeApi = {
  getMandate: () => api.get("content", "legislative-mandate"),
  getStructure: () => api.get("content", "legislative-structure"),
};

export const transparencyApi = {
  getCitizenCharter: () => api.get("content", "transparency-citizen-charter"),
  getFullDisclosure: () => api.get("content", "transparency-full-disclosure"),
  getInfrastructure: () => api.get("content", "transparency-infrastructure"),
  getFinanceReports: () => api.get("content", "transparency-finance-reports"),
  getExecutiveOrders: () => api.get("content", "transparency-executive-orders"),
  getBudget: () => api.get("content", "transparency-budget"),
  getBiddings: () => api.get("content", "transparency-biddings"),
};

export const tourismApi = {
  getSpots: () => api.get("content", "tourism-spots"),
  getFestivities: () => api.get("content", "tourism-festivities"),
  getDelicacies: () => api.get("content", "tourism-delicacies"),
};

export const formsApi = {
  getBusinessPermits: () => api.get("content", "forms-business-permits"),
  getBuildingPermits: () => api.get("content", "forms-building-permits"),
  getZoningClearance: () => api.get("content", "forms-zoning-clearance"),
};

export default api;

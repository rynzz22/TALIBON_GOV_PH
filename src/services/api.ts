import { supabase } from "../lib/supabase";
import { ContentData } from "../types";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants";

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const getCacheKey = (table: string, slug: string) => `${table}:${slug}`;

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const api = {
  get: async (table: string, slug: string): Promise<ContentData> => {
    const cacheKey = getCacheKey(table, slug);
    const cached = cache.get(cacheKey);

    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("slug", slug)
        .limit(1);

      if (error) {
        console.error(`Query failed for ${table}/${slug}:`, error.message);
        return { data: [], content: "" } as any;
      }

      const singleData = data && data.length > 0 ? data[0] : null;
      const result = singleData?.body || singleData || { data: [], content: "" };
      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      console.error(`API error: ${error}`);
      return { data: [], content: "" } as any;
    }
  },
};

export const aboutApi = {
  getProfile: () => api.get("content", API_ENDPOINTS.ABOUT.PROFILE),
  getSeal: () => api.get("content", API_ENDPOINTS.ABOUT.SEAL),
  getHistory: () => api.get("content", API_ENDPOINTS.ABOUT.HISTORY),
  getMayors: () => api.get("content", API_ENDPOINTS.ABOUT.MAYORS),
  getDepartments: () => api.get("content", API_ENDPOINTS.ABOUT.DEPARTMENTS),
  getVicinityMap: () => api.get("content", API_ENDPOINTS.ABOUT.VICINITY_MAP),
  getBarangays: () => api.get("content", API_ENDPOINTS.ABOUT.BARANGAYS),
  getBarangayStats: () => api.get("content", API_ENDPOINTS.ABOUT.BARANGAYS),
  getBarangayStatsBySlug: async (slug: string) => {
    const data = await api.get("content", API_ENDPOINTS.ABOUT.BARANGAYS);
    const stats = (data as any).data || (Array.isArray(data) ? data : []);
    return stats.find((s: any) => s.slug === slug);
  },
  getIndustry: () => api.get("content", API_ENDPOINTS.ABOUT.INDUSTRY),
  getServices: () => api.get("content", API_ENDPOINTS.ABOUT.SERVICES),
  getHymn: () => api.get("content", API_ENDPOINTS.ABOUT.HYMN),
  getDemographics: () => api.get("content", API_ENDPOINTS.ABOUT.DEMOGRAPHICS),
  getLocation: () => api.get("content", API_ENDPOINTS.ABOUT.LOCATION),
  getBarangayOfficials: async (brgyId: string) => {
    const { data, error } = await supabase.from('barangay_officials').select('*').eq('barangay_id', brgyId);
    if (error) throw error;
    return data;
  },
};

export const executiveApi = {
  getMandate: () => api.get("content", API_ENDPOINTS.EXECUTIVE.MANDATE),
  getVisionMission: () => api.get("content", API_ENDPOINTS.EXECUTIVE.VISION_MISSION),
  getChart: () => api.get("content", API_ENDPOINTS.EXECUTIVE.CHART),
  getDirectory: () => api.get("content", API_ENDPOINTS.EXECUTIVE.DIRECTORY),
  getGadIms: () => api.get("content", API_ENDPOINTS.EXECUTIVE.GAD_IMS),
};

export const legislativeApi = {
  getMandate: () => api.get("content", API_ENDPOINTS.LEGISLATIVE.MANDATE),
  getStructure: () => api.get("content", API_ENDPOINTS.LEGISLATIVE.STRUCTURE),
};

export const transparencyApi = {
  getCitizenCharter: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.CITIZEN_CHARTER),
  getFullDisclosure: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.FULL_DISCLOSURE),
  getInfrastructure: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.INFRASTRUCTURE),
  getFinanceReports: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.FINANCE_REPORTS),
  getExecutiveOrders: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.EXECUTIVE_ORDERS),
  getBudget: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.BUDGET),
  getBiddings: () => api.get("content", API_ENDPOINTS.TRANSPARENCY.BIDDINGS),
};

export const tourismApi = {
  getSpots: () => api.get("content", API_ENDPOINTS.TOURISM.SPOTS),
  getFestivities: () => api.get("content", API_ENDPOINTS.TOURISM.FESTIVITIES),
  getDelicacies: () => api.get("content", API_ENDPOINTS.TOURISM.DELICACIES),
};

export const formsApi = {
  getBusinessPermits: () => api.get("content", API_ENDPOINTS.FORMS.BUSINESS_PERMITS),
  getBuildingPermits: () => api.get("content", API_ENDPOINTS.FORMS.BUILDING_PERMITS),
  getZoningClearance: () => api.get("content", API_ENDPOINTS.FORMS.ZONING_CLEARANCE),
};

export default api;

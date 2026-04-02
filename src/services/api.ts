import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const aboutApi = {
  getProfile: () => api.get("/about/profile"),
  getSeal: () => api.get("/about/seal"),
  getHistory: () => api.get("/about/history"),
  getMayors: () => api.get("/about/mayors"),
  getDepartments: () => api.get("/about/departments"),
  getVicinityMap: () => api.get("/about/vicinity-map"),
  getBarangays: () => api.get("/about/barangays"),
  getIndustry: () => api.get("/about/industry"),
  getServices: () => api.get("/about/services"),
  getHymn: () => api.get("/about/hymn"),
};

export const executiveApi = {
  getMandate: () => api.get("/executive/mandate"),
  getVisionMission: () => api.get("/executive/vision-mission"),
  getChart: () => api.get("/executive/chart"),
  getDirectory: () => api.get("/executive/directory"),
  getGadIms: () => api.get("/executive/gad-ims"),
};

export const legislativeApi = {
  getMandate: () => api.get("/legislative/mandate"),
  getStructure: () => api.get("/legislative/structure"),
  getOrdinances: () => api.get("/legislative/ordinances"),
  getResolutions: () => api.get("/legislative/resolutions"),
};

export const newsApi = {
  getArticles: () => api.get("/news/articles"),
  getAdvisories: () => api.get("/news/advisories"),
  getDisasterPreparedness: () => api.get("/news/disaster-preparedness"),
  getUpdates: () => api.get("/news/updates"),
  getGallery: () => api.get("/news/gallery"),
  getCommunity: () => api.get("/news/community"),
  getPublicNotices: () => api.get("/news/public-notices"),
  getDownloadable: () => api.get("/news/downloadable"),
};

export const transparencyApi = {
  getCitizenCharter: () => api.get("/transparency/citizen-charter"),
  getFullDisclosure: () => api.get("/transparency/full-disclosure"),
  getInfrastructure: () => api.get("/transparency/infrastructure"),
  getFinanceReports: () => api.get("/transparency/finance-reports"),
  getExecutiveOrders: () => api.get("/transparency/executive-orders"),
  getBudget: () => api.get("/transparency/budget"),
  getBayanihanGrant: () => api.get("/transparency/bayanihan-grant"),
  getBiddings: () => api.get("/transparency/biddings"),
  getOrdinances: () => api.get("/transparency/ordinances"),
  getSroi: () => api.get("/transparency/sroi"),
};

export const tourismApi = {
  getSpots: () => api.get("/tourism/spots"),
  getFestivities: () => api.get("/tourism/festivities"),
  getDelicacies: () => api.get("/tourism/delicacies"),
};

export const formsApi = {
  getDownloadable: () => api.get("/forms/downloadable"),
  getBusinessPermits: () => api.get("/forms/business-permits"),
  getBuildingPermits: () => api.get("/forms/building-permits"),
  getZoningClearance: () => api.get("/forms/zoning-clearance"),
};

export default api;

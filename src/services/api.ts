import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const aboutApi = {
  getProfile: () => api.get("/about/profile"),
  getSeal: () => api.get("/about/seal"),
  getHistory: () => api.get("/about/history"),
  getMayors: () => api.get("/about/mayors"),
  getBarangays: () => api.get("/about/barangays"),
};

export const executiveApi = {
  getMandate: () => api.get("/executive/mandate"),
  getVisionMission: () => api.get("/executive/vision-mission"),
  getChart: () => api.get("/executive/chart"),
  getDirectory: () => api.get("/executive/directory"),
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
  getGallery: () => api.get("/news/gallery"),
};

export const transparencyApi = {
  getCitizenCharter: () => api.get("/transparency/citizen-charter"),
  getFullDisclosure: () => api.get("/transparency/full-disclosure"),
  getInfrastructure: () => api.get("/transparency/infrastructure"),
  getBudget: () => api.get("/transparency/budget"),
};

export const tourismApi = {
  getSpots: () => api.get("/tourism/spots"),
  getFestivities: () => api.get("/tourism/festivities"),
  getDelicacies: () => api.get("/tourism/delicacies"),
};

export const formsApi = {
  getDownloadable: () => api.get("/forms/downloadable"),
};

export default api;

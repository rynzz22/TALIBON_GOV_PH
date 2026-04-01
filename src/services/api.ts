const BASE_URL = "/api";

const fetchApi = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const aboutApi = {
  getProfile: () => fetchApi("/about/profile"),
  getSeal: () => fetchApi("/about/seal"),
  getHistory: () => fetchApi("/about/history"),
  getMayors: () => fetchApi("/about/mayors"),
  getBarangays: () => fetchApi("/about/barangays"),
};

export const executiveApi = {
  getMandate: () => fetchApi("/executive/mandate"),
  getVisionMission: () => fetchApi("/executive/vision-mission"),
  getChart: () => fetchApi("/executive/chart"),
  getDirectory: () => fetchApi("/executive/directory"),
};

export const legislativeApi = {
  getMandate: () => fetchApi("/legislative/mandate"),
  getStructure: () => fetchApi("/legislative/structure"),
  getOrdinances: () => fetchApi("/legislative/ordinances"),
  getResolutions: () => fetchApi("/legislative/resolutions"),
};

export const newsApi = {
  getArticles: () => fetchApi("/news/articles"),
  getAdvisories: () => fetchApi("/news/advisories"),
  getDisasterPreparedness: () => fetchApi("/news/disaster-preparedness"),
  getGallery: () => fetchApi("/news/gallery"),
};

export const transparencyApi = {
  getCitizenCharter: () => fetchApi("/transparency/citizen-charter"),
  getFullDisclosure: () => fetchApi("/transparency/full-disclosure"),
  getInfrastructure: () => fetchApi("/transparency/infrastructure"),
  getBudget: () => fetchApi("/transparency/budget"),
};

export const tourismApi = {
  getSpots: () => fetchApi("/tourism/spots"),
  getFestivities: () => fetchApi("/tourism/festivities"),
  getDelicacies: () => fetchApi("/tourism/delicacies"),
};

export const formsApi = {
  getDownloadable: () => fetchApi("/forms/downloadable"),
};

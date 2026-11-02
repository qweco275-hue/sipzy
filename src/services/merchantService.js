import { MERCHANTS_DATA, PRODUCTS_DATA } from "../data/mockData";
const FAVORITES_KEY = "sipzy_favorites";
export const merchantService = {
  getAllMerchants() {
    return MERCHANTS_DATA;
  },
  getMerchantById(id) {
    return MERCHANTS_DATA.find((m) => m.id === id);
  },
  getProductsByMerchant(merchantId) {
    return PRODUCTS_DATA.filter((p) => p.merchantId === merchantId);
  },
  getAllProducts() {
    return PRODUCTS_DATA;
  },
  filterMerchants(params) {
    let result = [...MERCHANTS_DATA];
    if (params.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || m.address.toLowerCase().includes(q) || m.tags.some((t) => t.toLowerCase().includes(q)) || m.description.toLowerCase().includes(q)
      );
    }
    if (params.category && params.category !== "Semua") {
      result = result.filter((m) => m.category === params.category);
    }
    if (params.location && params.location !== "Semua") {
      result = result.filter((m) => m.location.toLowerCase().includes(params.location.toLowerCase()));
    }
    if (params.minRating && params.minRating > 0) {
      result = result.filter((m) => m.rating >= params.minRating);
    }
    if (params.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sortBy === "popular") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (params.sortBy === "nearest") {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    return result;
  },
  getFavorites() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ["m_kaliurang"];
  },
  toggleFavorite(merchantId) {
    const favorites = this.getFavorites();
    const exists = favorites.includes(merchantId);
    const updated = exists ? favorites.filter((id) => id !== merchantId) : [...favorites, merchantId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  }
};

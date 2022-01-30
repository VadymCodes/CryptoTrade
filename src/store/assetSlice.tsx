import { getAssets } from "../services/assetApi";

const createAssetSlice = (set: any, get: any) => ({
  loading: false,
  assets: [],
  fetchAssets: async (limit: number) => {
    set({ loading: true });
    const response = await getAssets(limit);
    const assets = await response.json();
    set({ assets: assets.data });
    set({ loading: false });
  }
});

export default createAssetSlice;
import create from 'zustand';

import createAssetSlice from './assetSlice';
import createPageLimitSlice from './pageLimitSlice';
import createAuthSlice from './authSlice';

const useStore = create((set, get) => ({
    ...createAssetSlice(set, get),
    ...createPageLimitSlice(set, get),
    ...createAuthSlice(set, get),
}));

export default useStore;

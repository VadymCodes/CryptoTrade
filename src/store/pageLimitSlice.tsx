const createPageLimitSlice = (set: any, get: any) => ({
  pageLimit: 10,
  setLimit: (pageLimit: number) => {
    set({ pageLimit: pageLimit });
  }
});

export default createPageLimitSlice;
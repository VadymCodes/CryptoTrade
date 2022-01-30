const createAuthSlice = (set: any, get: any) => ({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {
    set({ isLogged: isLogged });
  }
});

export default createAuthSlice;
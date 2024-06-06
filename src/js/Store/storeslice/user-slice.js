export const userStoreSlice = (set, get) => ({
    userData: {},
    setUserData: (value) => set({ userData: value }),

    profileProgress: {},
    setProfileProgress: (value) => set({ profileProgress: value }),
});

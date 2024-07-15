
export const userStoreSlice = (set, get) => ({
    user: {},
    setUser: (key, value) => set(state => {
        state.user[key] = value;
    }),
});

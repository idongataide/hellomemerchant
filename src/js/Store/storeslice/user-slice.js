// storeslice/user-slice.js
export const userStoreSlice = (set, get) => ({
    userData: {},
    setUserData: (value) => set(state => {
        state.userData = value;
    }),

    profileProgress: {},
    setProfileProgress: (value) => set(state => {
        state.profileProgress = value;
    }),

    securityQuestions: {},
    setSecurityQuestions: (value) => set(state => {
        state.securityQuestions = value;
    }),
});

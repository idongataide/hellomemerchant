export const PasswordSlice = (set) => ({
    passwordConditions: {
      character: false,
      uppercase: false,
      length: false,
    },
    setPasswordCondition: (condition, value) => set((state) => {
      state.passwordConditions[condition] = value;
    }),
  });
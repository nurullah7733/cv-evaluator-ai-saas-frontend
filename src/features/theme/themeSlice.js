// features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getSystem = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const resolve = (mode, sys) => (mode === "system" ? sys : mode);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "system",
    sys: getSystem(),
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSystem: (state, action) => {
      state.sys = action.payload;
    },
  },
  selectors: {
    selectResolved: (state) => resolve(state.mode, state.sys),
  },
});

export const { setMode, setSystem } = themeSlice.actions;
export const { selectResolved } = themeSlice.selectors;
export default themeSlice.reducer;

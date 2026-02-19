import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createResumeAnalysis: [],
};

// Its for instantly data access to dashboard page form home page without refetching from server
const createResumeAnalysisSlice = createSlice({
  name: "createResumeAnalysis",
  initialState,
  reducers: {
    setCreateResumeAnalysis(state, actions) {
      state.createResumeAnalysis = actions.payload;
    },
    resetCreateResumeAnalysis(state) {
      state.createResumeAnalysis = [];
    },
  },
});

export const { setCreateResumeAnalysis, resetCreateResumeAnalysis } =
  createResumeAnalysisSlice.actions;

export default createResumeAnalysisSlice.reducer;

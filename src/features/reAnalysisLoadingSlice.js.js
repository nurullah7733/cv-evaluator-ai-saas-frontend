import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reAnalysisLoading: false,
};

// reanalysis loading. (Becuse Reanalysis modal redirect to dashboard page)
const reAnalysisLoadingSlice = createSlice({
  name: "reAnalysisLoading",
  initialState,
  reducers: {
    setReAnalysisLoading(state, actions) {
      state.reAnalysisLoading = actions.payload;
    },
  },
});

export const { setReAnalysisLoading } = reAnalysisLoadingSlice.actions;

export default reAnalysisLoadingSlice.reducer;

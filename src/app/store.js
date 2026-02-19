import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import themeReducer from "../features/theme/themeSlice";
import createResumeAnalysisSlice from "../features/createResumeAnalysisSlice";
import reAnalysisLoadingSlice from "../features/reAnalysisLoadingSlice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer, // theme reducer
    createResumeAnalysis: createResumeAnalysisSlice,
    reAnalysisLoading: reAnalysisLoadingSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

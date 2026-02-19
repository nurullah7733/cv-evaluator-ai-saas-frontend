import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetGlobalToken } from "../lib/globalClerkToken";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      if (GetGlobalToken) {
        const token = await GetGlobalToken();
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Analysis", "History", "Comparison"],
  endpoints: (builder) => ({
    // Upload and analyze resume ok
    analyzeResume: builder.mutation({
      query: (formData) => ({
        url: "/resume-analysis",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Analysis", "History"],
    }),

    // Re-analyze resume ok
    reAnalyzeResume: builder.mutation({
      query: (data) => ({
        url: "/resume-reanalysis",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analysis", "History", "Comparison"],
    }),

    // Get all resumes ok
    getAllResumes: builder.query({
      query: ({ pageNo, perPage, searchKeyword }) =>
        `/all-resumes/${pageNo}/${perPage}/${searchKeyword}`,
      providesTags: ["Analysis"],
    }),

    // Get resume details with latest analysis ok
    getResumeDetails: builder.query({
      query: (resumeId) => `/get-resume-details-by-id/${resumeId}`,
      providesTags: ["Analysis"],
    }),

    // Get analysis history ok
    getAnalysisHistory: builder.query({
      query: (resumeId) => `/resume-history/${resumeId}`,
      providesTags: ["History"],
    }),

    // Get Analysis (specific version) ok
    getAnalysisVersion: builder.query({
      query: (analysisId) => `/get-analysis/${analysisId}`,
    }),

    // Get comparison ok
    getComparison: builder.query({
      query: ({ resumeId, analysisId }) => `/compare/${resumeId}/${analysisId}`,
      providesTags: ["Comparison"],
    }),

    // Delete resume
    deleteResume: builder.mutation({
      query: (resumeId) => ({
        url: `/delete-resume-by-id/${resumeId}`,
        method: "GET",
      }),
      invalidatesTags: ["Analysis", "History"],
    }),
  }),
});

export const {
  useAnalyzeResumeMutation,
  useReAnalyzeResumeMutation,
  useGetAllResumesQuery,
  useGetResumeDetailsQuery,
  useGetAnalysisHistoryQuery,
  useGetAnalysisVersionQuery,
  useGetComparisonQuery,
  useDeleteResumeMutation,
} = apiSlice;

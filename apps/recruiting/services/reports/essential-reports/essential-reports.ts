import { baseAPI } from "@services/base-api";
import {
  ESSENTIAL_REPORTS,
  PIPE_LINE_REPORTS,
  INTERVIEWING_ACTIVITY,
  DEPARTMENT_SUMMARY,
  APPLICATION_OVER_TIME,
  CANDIDATE_SOURCE,
} from "@services/tags";

export const essentialReports = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEssentialReports: builder.query({
      query: (payload) => {
        return {
          url: "reports/recentlyViewed-list",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [ESSENTIAL_REPORTS],
    }),
    getPipeLineReports: builder.query({
      query: (payload) => {
        return {
          url: "reports/getPipelinePerJob",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [PIPE_LINE_REPORTS],
    }),
    getInterviewingActivityJob: builder.query({
      query: (payload) => {
        return {
          url: "reports/getInterviewingActivityPerJob",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [INTERVIEWING_ACTIVITY],
    }),
    getDepartmentSummary: builder.query({
      query: (payload) => {
        return {
          url: "reports/getDepartmentSummary",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [DEPARTMENT_SUMMARY],
    }),
    getApplicationOverTime: builder.query({
      query: (payload) => {
        return {
          url: "reports/getApplicationOverTime",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [APPLICATION_OVER_TIME],
    }),
    getCandidateSource: builder.query({
      query: (payload) => {
        return {
          url: "reports/getcandiateSource",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [CANDIDATE_SOURCE],
    }),
  }),
});

export const {
  useGetEssentialReportsQuery,
  useGetPipeLineReportsQuery,
  useGetInterviewingActivityJobQuery,
  useGetDepartmentSummaryQuery,
  useGetApplicationOverTimeQuery,
  useGetCandidateSourceQuery,
} = essentialReports;

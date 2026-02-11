import { baseAPI } from "@services/base-api";
import { DASHBOARD } from "@services/tags";

export const dashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query({
      query: () => ({
        url: "performance-dashboard/analytics",
        method: "GET",
      }),
      providesTags: [DASHBOARD],
    }),
    getTaskToComplete: builder.query({
      query: () => ({
        url: "performance-dashboard/tasks-to-complete",
        method: "GET",
      }),
      providesTags: [DASHBOARD],
    }),
    getOneOnOne: builder.query({
      query: () => ({
        url: "performance-dashboard/one-on-one",
        method: "GET",
      }),
      providesTags: [DASHBOARD],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery, useGetTaskToCompleteQuery, useGetOneOnOneQuery } =
  dashboardApi;

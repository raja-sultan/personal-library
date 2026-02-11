import { baseAPI } from "@services/base-api";

export const overViewedReportApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewSavedReport: builder.query({
      query: (payload) => {
        return {
          url: "reports/reportsaved-list",
          method: "GET",
          params: payload.params,
        };
      },
      // providesTags: ["OVER_VIEWED_REPORT"],
    }),
    getLastViewedReport: builder.query({
      query: (payload) => {
        return {
          url: "reports/recentlyViewed-list",
          method: "GET",
          params: payload.params,
        };
      },
      // providesTags: ["OVER_VIEWED_REPORT"],
    }),
  }),
});

export const { useGetOverviewSavedReportQuery, useGetLastViewedReportQuery } = overViewedReportApi;
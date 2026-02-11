import { baseAPI } from "./base-api";

export const ssoAdminDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductSales: builder.query({
      query: () => "super-admin/verified-products-count",
    }),
    getTotalUserCount: builder.query({
      query: () => "super-admin/total-user-count",
    }),
    getTotalConnectedDevices: builder.query({
      query: (params) => ({
        url: "super-admin/dashboard-list-connected-devices",
        method: "GET",
        params,
      }),
    }),
    getScheduleList: builder.query({
      query: ({ month, year }) =>
        `super-admin/list-schedule-demos/${month}/${year}`,
    }),
    getAuditTrial: builder.query({
      query: () => `/super-admin/audit-trail-recent-activities`,
    }),
  }),
});

export const {
  useGetProductSalesQuery,
  useGetTotalUserCountQuery,
  useGetTotalConnectedDevicesQuery,
  useGetScheduleListQuery,
  useGetAuditTrialQuery,
} = ssoAdminDashboardApi;

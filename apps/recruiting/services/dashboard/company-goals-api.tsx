import { baseAPI } from "@services/base-api";
import { DASHBOARD } from "@services/tags";

const CompanyGoalsDash = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (payload) => ({
        url: "/super-admin/system-admin/get-all-users",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardEventList: builder.query({
      query: () => ({
        url: "/dashboard/event-list",
        method: "GET",
        params: { limit: 2, offset: 0 },
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardMyReferrals: builder.query({
      query: (params) => ({
        url: "/dashboard/my-referrals",
        method: "GET",
        params,
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardMyInterviews: builder.query({
      query: (params) => ({
        url: "/dashboard/my-interviews",
        method: "GET",
        params,
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardJobsPosted: builder.query({
      query: () => ({
        url: "/dashboard/jobs-posted",
        method: "GET",
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardMyGoals: builder.query({
      query: (params) => ({
        url: "/dashboard/list-my-goal",
        method: "GET",
        params,
      }),
      providesTags: [DASHBOARD],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetDashboardMyReferralsQuery,
  useGetDashboardEventListQuery,
  useGetDashboardMyInterviewsQuery,
  useGetDashboardJobsPostedQuery,
  useGetDashboardMyGoalsQuery,
} = CompanyGoalsDash;

import { baseAPI } from "@services/base-api";
import { DASHBOARD } from "@services/tags";

const TasksApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardTasks: builder.query({
      query: () => ({
        url: "/jobs/get-task-count-category",
        method: "GET",
        // params: { limit: 2, offset: 0 },
      }),
      providesTags: [DASHBOARD],
    }),
    getDashboardOffer: builder.query({
      query: () => ({
        url: "/dashboard/get-approvals-offer",
        method: "GET",
      }),
      providesTags: [DASHBOARD],
    }),
  }),
});

export const { useGetDashboardTasksQuery, useGetDashboardOfferQuery } = TasksApi;

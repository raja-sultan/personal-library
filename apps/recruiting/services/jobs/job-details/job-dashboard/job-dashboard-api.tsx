import { baseAPI } from "@services/base-api";
import { JOB_DASHBOARD } from "@services/tags";

export const jobDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobDashboardData: builder.query({
      query: (jobId) => `jobs/job-dashboard/${jobId}`,
      providesTags: [JOB_DASHBOARD],
    }),
  }),
});

export const { useGetJobDashboardDataQuery } = jobDashboardApi;

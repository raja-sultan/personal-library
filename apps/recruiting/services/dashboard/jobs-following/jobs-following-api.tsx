import { baseAPI } from "@services/base-api";
import { DASHBOARD } from "@services/tags";

const JobsFollowingApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFollowJobs: builder.query({
      query: (params) => ({
        url: "/dashboard/get-followJobs",
        method: "GET",
        params,
      }),
      providesTags: [DASHBOARD],
    }),
  }),
});

export const { useGetFollowJobsQuery } = JobsFollowingApi;

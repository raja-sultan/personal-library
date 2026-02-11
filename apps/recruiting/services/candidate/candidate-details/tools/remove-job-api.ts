import { baseAPI } from "@services/base-api";
import { CANDIDATE_JOBS } from "@services/tags";

export const removeJob = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ candidateId }: any) => ({
        url: `candidates/tools/candidateList/${candidateId}`,
        method: "GET",
      }),
      providesTags: [CANDIDATE_JOBS],
    }),
    removeJobs: builder.mutation({
      query: (payload) => ({
        url: "candidates/remove-job-candidate",
        method: "PUT",
        params: payload,
      }),
      invalidatesTags: [CANDIDATE_JOBS],
    }),
  }),
});

export const { useRemoveJobsMutation, useGetJobsQuery } = removeJob;

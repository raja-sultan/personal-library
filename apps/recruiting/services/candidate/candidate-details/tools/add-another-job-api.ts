import { baseAPI } from "@services/base-api";
import { CANDIDATE_JOBS } from "@services/tags";

export const addAnotherJobApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addAnotherJob: builder.mutation({
      query: ({ body, param }: any) => ({
        url: "candidates/add-job-candidate-to-another-job",
        method: "PUT",
        body,
        params: param,
      }),
      invalidatesTags: [CANDIDATE_JOBS],
    }),
  }),
});

export const { useAddAnotherJobMutation } = addAnotherJobApi;

import { baseAPI } from "@services/base-api";

const TAG = "GET_JOB_CANDIDATES";

export const CandidateTagsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobCandidate: builder.query({
      query: (params) => ({
        url: "candidates/get-job-candidate",
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    postCandidateData: builder.mutation({
      query: ({ body, candidateId }: any) => ({
        url: `candidates/add-candidate-tags?candidateId=${candidateId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG],
    }),
    updateCandidateData: builder.mutation({
      query: ({ body, candidateId }: any) => ({
        url: `candidates/edit-candidate-tags?candidateId=${candidateId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useUpdateCandidateDataMutation,
  usePostCandidateDataMutation,
  useGetJobCandidateQuery,
} = CandidateTagsApi;

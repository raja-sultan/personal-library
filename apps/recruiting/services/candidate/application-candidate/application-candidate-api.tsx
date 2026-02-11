import { baseAPI } from "@services/base-api";
import { APPLICATION_CANDIDATE } from "@services/tags";

export const applicationCandidateApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationCandidate: builder.query({
      query: ({ candidateId }) => ({
        url: `candidates/applications/${candidateId}`,
        method: "GET",
      }),
      providesTags: [APPLICATION_CANDIDATE],
    }),
    getApplicationCandidateFormList: builder.query({
      query: ({ candidateId, jobId }) => ({
        url: `candidates/list-candidate-form/${candidateId}/${jobId}`,
        method: "GET",
      }),
      providesTags: [APPLICATION_CANDIDATE],
    }),
  }),
});
export const {
  useGetApplicationCandidateQuery,
  useGetApplicationCandidateFormListQuery,
} = applicationCandidateApi;

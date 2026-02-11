import { baseAPI } from "@services/base-api";
import { PIPELINE, CANDIDATE_PROSPECT } from "@services/tags";

export const CandidateProspectApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobCandidate: builder.query({
      query: (params) => ({
        url: "candidates/get-job-candidate",
        method: "GET",
        params,
      }),
      providesTags: [CANDIDATE_PROSPECT],
    }),
    getPoolStagesDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `crm/dropdown-get-all-prospect-pool`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getProspectOwnersDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `super-admin/system-admin/dropdown-get-all-users`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    stopConsideringProspect: builder.mutation({
      query: ({ body, candidateId }: any) => ({
        url: `candidates/stop-considering-prospect/${candidateId}/${body?.shouldSendEmail}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [CANDIDATE_PROSPECT],
    }),
    editProspect: builder.mutation({
      query: ({ body, prospectId }) => ({
        url: `candidates/update-prospect/${prospectId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [CANDIDATE_PROSPECT, PIPELINE],
    }),
  }),
});

export const {
  useStopConsideringProspectMutation,
  useGetJobCandidateQuery,
  useLazyGetPoolStagesDropdownQuery,
  useEditProspectMutation,
  useLazyGetProspectOwnersDropdownQuery,
} = CandidateProspectApi;

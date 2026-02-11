// /jobs/job-stage-detail?jobId=123
import type { IPARAMS } from "@sections/jobs/job-details/pipe-line/pipe-line.types";
import { baseAPI } from "@services/base-api";
import { PIPELINE } from "@services/tags";

const PipelineApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobStageDetails: builder.query({
      query: (params: IPARAMS) => ({
        url: "/jobs/job-stage-detail",
        method: "GET",
        params,
      }),
      providesTags: [PIPELINE],
    }),
    getJobsDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `/jobs/dropdown-jobs-list`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getDepartmentsDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `/jobs/dropdown-department-list`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getOfficeDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `/organization/dropdown-office-list`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getJobCandidate: builder.query({
      query: (params) => ({
        url: "/candidates/get-job-candidate",
        method: "GET",
        params,
      }),
      providesTags: [PIPELINE],
    }),
    updateCandidateStage: builder.mutation({
      query: ({ body, candidateId }) => ({
        url: `/candidates/update-candidate-stage/?candidateId=${candidateId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [PIPELINE],
    }),
    addCandidateTags: builder.mutation({
      query: ({ body, candidateId }) => ({
        url: `/candidates/add-candidate-tags?candidateId=${candidateId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [PIPELINE],
    }),
    rejectCandidate: builder.mutation({
      query: ({ body, candidateId }) => ({
        url: `/candidates/reject-job-candidate?candidateId=${candidateId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [PIPELINE],
    }),
    transferCandidateToOtherJob: builder.mutation({
      query: ({ body, candidateId }) => ({
        url: `/candidates/transfer-job-candidate?candidateId=${candidateId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [PIPELINE],
    }),
    candidateFeedback: builder.mutation({
      query: (body) => ({
        url: `/jobs/add-feedback`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PIPELINE],
    }),
  }),
});
export const {
  useGetJobStageDetailsQuery,
  useUpdateCandidateStageMutation,
  useGetJobCandidateQuery,
  useAddCandidateTagsMutation,
  useRejectCandidateMutation,
  useGetJobsDropdownQuery,
  useLazyGetJobsDropdownQuery,
  useTransferCandidateToOtherJobMutation,
  useCandidateFeedbackMutation,
  useGetDepartmentsDropdownQuery,
  useLazyGetDepartmentsDropdownQuery,
  useGetOfficeDropdownQuery,
  useLazyGetOfficeDropdownQuery,
} = PipelineApi;

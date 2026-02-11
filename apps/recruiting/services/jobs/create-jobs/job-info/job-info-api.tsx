import { baseAPI } from "@services/base-api";
import { ADD_JOB_INFO, UPDATE_JOB_APPROVAL } from "@services/tags";

// please chnage the url and add the base url and update tags too
export const jobInfoApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobInfo: builder.query({
      query: ({ jobId }) => `jobs/details/${jobId}`,
      providesTags: [ADD_JOB_INFO, UPDATE_JOB_APPROVAL],
    }),
    addJobInfo: builder.mutation<null, any>({
      query: (body) => ({
        url: "jobs/add-job",
        method: "POST",
        body,
      }),
      invalidatesTags: [ADD_JOB_INFO],
    }),
    updateJobInfo: builder.mutation<null, any>({
      query: ({ payload, jobId }) => ({
        url: `jobs/update-job/${jobId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [ADD_JOB_INFO],
    }),
    updateJobApprovalInfo: builder.mutation<null, any>({
      query: ({ payload, jobId }) => ({
        url: `/jobs/Approvals/${jobId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [UPDATE_JOB_APPROVAL],
    }),
    closeReasonList: builder.query({
      query: ({ params }: any) => ({
        url: "configuration/close-reason/list",
        method: "GET",
        params: {
          limit: 10000,
        },
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    deleteOpeningId: builder.mutation({
      query: (jobOpeningId) => {
        return {
          url: `jobs/job-opening/${jobOpeningId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [ADD_JOB_INFO, UPDATE_JOB_APPROVAL],
    }),
  }),
});

export const {
  useAddJobInfoMutation,
  useLazyGetJobInfoQuery,
  useGetJobInfoQuery,
  // useGetViewReportQuery,

  useUpdateJobInfoMutation,
  useUpdateJobApprovalInfoMutation,
  useLazyCloseReasonListQuery,
  useDeleteOpeningIdMutation,
} = jobInfoApi;

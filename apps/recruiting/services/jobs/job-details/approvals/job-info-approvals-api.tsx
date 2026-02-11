import { baseAPI } from "@services/base-api";
import { JOB_INFORMATION_APPROVALS } from "@services/tags";

const JobInformationApprovals = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobInformationApprovals: builder.query({
      query: ({ jobId }) => ({
        url: `jobs/overview/get-job-info/${jobId}`,
        method: "GET",
      }),
      providesTags: [JOB_INFORMATION_APPROVALS],
    }),

    getApprovalDetailsHistory: builder.query({
      query: ({ jobId }) => ({
        url: `offer/get-aprroval-details-hitory/${jobId}`,
        method: "GET",
        params: { jobId },
      }),
      providesTags: [JOB_INFORMATION_APPROVALS],
    }),

    updateJobInformationApprovals: builder.mutation({
      query: (payload) => ({
        url: `jobs/overview/update-job-info`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [JOB_INFORMATION_APPROVALS],
    }),
    updateLeaveJobNote: builder.mutation({
      query: (payload) => ({
        url: `jobs/leave-job-note/${payload.jobId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [JOB_INFORMATION_APPROVALS],
    }),
    DepartmentList: builder.query({
      query: (params) => ({
        url: "/jobs/dropdown-department-list",
        method: "GET",
        params,
      }),
      providesTags: [JOB_INFORMATION_APPROVALS],
    }),
    getJobOfficeList: builder.query({
      query: () => ({
        url: "organization/dropdown-office-list",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetJobInformationApprovalsQuery,
  useUpdateJobInformationApprovalsMutation,
  useUpdateLeaveJobNoteMutation,
  useGetApprovalDetailsHistoryQuery,
  useLazyDepartmentListQuery,
  useLazyGetJobOfficeListQuery,
  useDepartmentListQuery,
  useGetJobOfficeListQuery,
} = JobInformationApprovals;

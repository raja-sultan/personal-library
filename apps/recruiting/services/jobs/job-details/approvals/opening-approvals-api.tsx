import { baseAPI } from "@services/base-api";
import {
  JOB_OPENING_INFO_IN_JOB_DETAILS,
  OPENINGS_APPROVALS_DETAILS,
  SINGLE_JOB_OPENING_INFO,
} from "@services/tags";

const OpeningsApprovalsDetails = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOpeningsApprovalsDetails: builder.query({
      query: ({ jobId, stepName }) => ({
        url: `jobs/details/${jobId}`,
        method: "GET",
        params: stepName,
      }),
      providesTags: [
        OPENINGS_APPROVALS_DETAILS,
        SINGLE_JOB_OPENING_INFO,
        JOB_OPENING_INFO_IN_JOB_DETAILS,
      ],
    }),

    // Get All User Api
    getApprovalsJobOfferUsers: builder.query({
      query: ({ params }) => ({
        url: "/super-admin/system-admin/dropdown-get-all-users",
        method: "GET",
        params,
      }),
      providesTags: [OPENINGS_APPROVALS_DETAILS],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    updateApprovalsJobOfferUsers: builder.mutation({
      query: (payload) => ({
        url: `jobs/approvals/add-step/${payload.jobId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [OPENINGS_APPROVALS_DETAILS],
    }),
    updateMarkAsApproved: builder.mutation({
      query: (payload) => ({
        url: `jobs/Approvals/mark/${payload.jobId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [
        OPENINGS_APPROVALS_DETAILS,
        SINGLE_JOB_OPENING_INFO,
        JOB_OPENING_INFO_IN_JOB_DETAILS,
      ],
    }),
    updateSendReminder: builder.mutation({
      query: (payload) => ({
        url: `jobs/Approvals/send-remainder/${payload.jobId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [OPENINGS_APPROVALS_DETAILS],
    }),
  }),
});
export const {
  useGetOpeningsApprovalsDetailsQuery,
  useLazyGetApprovalsJobOfferUsersQuery,
  useUpdateApprovalsJobOfferUsersMutation,
  useUpdateMarkAsApprovedMutation,
  useUpdateSendReminderMutation,
} = OpeningsApprovalsDetails;

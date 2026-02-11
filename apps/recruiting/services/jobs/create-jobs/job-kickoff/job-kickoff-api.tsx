import { baseAPI } from "@services/base-api";
import { JOB_DETAILS } from "@services/tags";

export const JobKickOff = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateJobKickOff: builder.mutation({
      query: ({ formData, jobId }) => ({
        url: `jobs/update-job/${jobId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [JOB_DETAILS],
    }),
    getUsersList: builder.query({
      query: () => ({
        url: "super-admin/system-admin/dropdown-get-all-users",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getUsersEmailList: builder.query({
      query: () => ({
        url: "configuration/get-email-templates",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetUsersListQuery,
  useGetUsersListQuery,
  useLazyGetUsersEmailListQuery,
  useUpdateJobKickOffMutation,
} = JobKickOff;

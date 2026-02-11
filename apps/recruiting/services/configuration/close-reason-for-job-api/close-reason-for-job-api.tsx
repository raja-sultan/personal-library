import { baseAPI } from "@services/base-api";
import { CLOSE_REASON_FOR_JOB } from "@services/tags";

export const closeReasonForJobApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCloseReasonForJobList: builder.query({
      query: (payload) => {
        return {
          url: `configuration/close-reason/list`,
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [CLOSE_REASON_FOR_JOB],
    }),
    postCloseReasonForJob: builder.mutation({
      query: (body) => {
        return {
          url: `configuration/create-close-reason`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [CLOSE_REASON_FOR_JOB],
    }),
    deleteCloseReasonForJob: builder.mutation({
      query: (reasonId) => {
        return {
          url: `configuration/delete-close-reason/${reasonId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [CLOSE_REASON_FOR_JOB],
    }),
    updateCloseReasonForJob: builder.mutation({
      query: ({ reasonId, formValues }) => {
        return {
          url: `configuration/update-close-reason/${reasonId}`,
          method: "PUT",
          body: formValues,
        };
      },
      invalidatesTags: [CLOSE_REASON_FOR_JOB],
    }),
  }),
});

export const {
  useGetCloseReasonForJobListQuery,
  usePostCloseReasonForJobMutation,
  useDeleteCloseReasonForJobMutation,
  useUpdateCloseReasonForJobMutation,
} = closeReasonForJobApi;

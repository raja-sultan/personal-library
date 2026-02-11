import { baseAPI } from "@services/base-api";
import { FORM_TABLE } from "@services/tags";

export const formTableAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get Api
    getFormTable: builder.query({
      query: ({ jobId }) => ({
        url: `/jobs/list-form`,
        method: "GET",
        params: { limit: 10, offset: 0, jobIds: jobId },
      }),
      providesTags: [FORM_TABLE, "job-details-forms"],
    }),

    // Delete Api
    deleteFormTable: builder.mutation({
      query: (ids) => {
        return {
          url: `/jobs/delete-form?formId=${ids}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [FORM_TABLE, "job-details-forms"],
    }),
  }),
});

export const { useGetFormTableQuery, useDeleteFormTableMutation } =
  formTableAPI;

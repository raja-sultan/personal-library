import { baseAPI } from "@services/base-api";
import { MANAGE_JOBS_FIELDS } from "@services/tags";

export const ManageJobFieldsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobFieldsListApi: builder.query({
      query: (params) => {
        return {
          url: `configuration/get-custom-fields`,
          method: "GET",
          params,
        };
      },
      providesTags: [MANAGE_JOBS_FIELDS],
    }),
    getSingleJobFieldsData: builder.query({
      query: ({ params }) => {
        return {
          url: `configuration/get-custom-field`,
          method: "GET",
          params,
        };
      },
    }),
    addCustomField: builder.mutation({
      query: ({ body }) => {
        return {
          url: `configuration/create-custom-field`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [MANAGE_JOBS_FIELDS],
    }),
    updateCustomField: builder.mutation({
      query: ({ body, fieldId }) => {
        return {
          url: `configuration/update-custom-field/${fieldId}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [MANAGE_JOBS_FIELDS],
    }),
    deleteCustomField: builder.mutation({
      query: ({ fieldId }) => {
        return {
          url: `configuration/delete-custom-field?fieldId=${fieldId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [MANAGE_JOBS_FIELDS],
    }),
    privateCustomField: builder.mutation({
      query: ({ body, fieldId }) => {
        return {
          url: `/configuration/update-private-locked/${fieldId}`,
          method: "PATCH",
          body
        };
      },
      invalidatesTags: [MANAGE_JOBS_FIELDS],
    }),
    swapFields: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/configuration/re-arrange-fields`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: [MANAGE_JOBS_FIELDS],
    }),
  }),
});

export const {
  useGetJobFieldsListApiQuery,
  useGetSingleJobFieldsDataQuery,
  useLazyGetSingleJobFieldsDataQuery,
  useAddCustomFieldMutation,
  useUpdateCustomFieldMutation,
  useDeleteCustomFieldMutation,
  usePrivateCustomFieldMutation,
  useSwapFieldsMutation,
} = ManageJobFieldsApi;

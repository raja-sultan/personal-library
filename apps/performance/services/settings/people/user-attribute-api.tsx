import { baseAPI } from "@services/base-api";

export const userAttributesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    attributesList: builder.query({
      query: ({ ...queryParams }) => ({
        url: `/user-attributes`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["ATTRIBUTES"],
    }),
    attributeDetails: builder.query({
      query: (id) => ({
        url: `/user-attributes/${id}`,
        method: "GET",
      }),
      providesTags: ["ATTRIBUTES_DETAILS"],
    }),

    attributeOptions: builder.query({
      query: ({...params}) => ({
        url: `user-attribute-options`,
        method: "GET",
        params
      }),
      providesTags: ["ATTRIBUTES_DETAILS"],
    }),

    archiveRestoreAttribute: builder.mutation({
      query: ({ archived, id }) => ({
        url: `/user-attributes/${id}/archive-or-restore/?archived=${archived}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ATTRIBUTES"],
    }),
    createAttribute: builder.mutation({
      query: (payload) => {
        return {
          url: `/user-attributes`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ATTRIBUTES"],
    }),
    updateAttribute: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/user-attributes/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["ATTRIBUTES", "ATTRIBUTES_DETAILS"],
    }),
    updateAttributeOption: builder.mutation({
      query: ({ userAttributeId, payload, optionId }) => {
        return {
          url: `/user-attributes/${userAttributeId}/options${
            optionId ? `?optionId=${optionId}` : ""
          }`,
          method: "PUT",
          body: { ...payload },
        };
      },
      invalidatesTags: ["ATTRIBUTES_DETAILS"],
    }),
    deleteAttributeOption: builder.mutation({
      query: (id) => {
        return {
          url: `/user-attribute-options/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ATTRIBUTES_DETAILS"],
    }),
  }),
});

export const {
  useAttributeOptionsQuery,
  useAttributesListQuery,
  useArchiveRestoreAttributeMutation,
  useCreateAttributeMutation,
  useAttributeDetailsQuery,
  useUpdateAttributeMutation,
  useUpdateAttributeOptionMutation,
  useDeleteAttributeOptionMutation,
} = userAttributesApi;

import { baseAPI } from "@services/base-api";
import { GROUPS } from "@services/tags";

export const updatesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    careeGroupList: builder.query({
      query: ({ ...queryParams }) => ({
        url: `career-groups`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: [GROUPS],
    }),
    editGroup: builder.mutation({
      query: ({ id, body }) => ({
        url: `career-groups/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [GROUPS],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `career-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GROUPS],
    }),
    createGroup: builder.mutation({
      query: ({body}) => ({
        url: `career-groups`,
        method: "POST",
        body
      }),
      invalidatesTags: [GROUPS],
    }),
    singleGroup: builder.query({
      query: ({ id }) => ({
        url: `career-groups/${id}`,
        method: "GET",
      }),
      providesTags: [GROUPS],
    }),
  }),
});

export const {
  useCareeGroupListQuery,
  useEditGroupMutation,
  useDeleteGroupMutation,
  useSingleGroupQuery,
  useCreateGroupMutation
} = updatesAPI;

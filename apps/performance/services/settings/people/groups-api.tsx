import { baseAPI } from "@services/base-api";
import { GROUPS } from "@services/tags";

export const groupApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    groupList: builder.query({
      query: ({ limit, offset, searchValue }) => ({
        url: `/groups?search=${searchValue}&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: [GROUPS],
    }),

    createGroup: builder.mutation({
      query: (data) => ({
        url: `/groups`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [GROUPS],
    }),

    groupViewList: builder.query({
      query: ({ id, searchValue }) => ({
        // url: `/groups/${id}?search=${searchValue}`,
        url: `/groups/${id}${searchValue ? `?search=${searchValue}` : ""}`,
        method: "GET",
      }),
      providesTags: [GROUPS],
    }),
    updateViewList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [GROUPS],
    }),
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: [GROUPS],
    }),
    deleteViewGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `/groups/${groupId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [GROUPS],
    }),
  }),
});

export const {
  useGroupListQuery,
  useUpdateViewListMutation,
  useCreateGroupMutation,
  useGroupViewListQuery,
  useLazyGroupViewListQuery,
  useDeleteGroupMutation,
  useDeleteViewGroupMutation,
} = groupApi;

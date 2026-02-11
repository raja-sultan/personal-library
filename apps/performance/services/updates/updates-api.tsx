import { baseAPI } from "../base-api";
import { UPDATES } from "../tags";

export const updatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    shareUpdate: builder.mutation({
      query: ({ id, body }) => ({
        url: `updates/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [UPDATES],
    }),
    editUpdate: builder.mutation({
      query: ({ id, body }) => ({
        url: `updates/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [UPDATES],
    }),
    getUpdates: builder.query({
      query: ({ ...params }) => ({
        url: "updates",
        method: "GET",
        params,
      }),
      providesTags: [UPDATES],
    }),
    getSingleUpdate: builder.query({
      query: ({ id }) => ({
        url: `updates/${id}`,
        method: "GET",
      }),
      providesTags: [UPDATES],
    }),
    addNewComment: builder.mutation({
      query: ({ id, pointId, comment }) => ({
        url: `updates/${id}/points/${pointId}/comments?text=${comment}`,
        method: "POST",
      }),
      invalidatesTags: [UPDATES],
    }),
    deleteComment: builder.mutation({
      query: ({ id, pointId, commentId }) => {
        return {
          url: `updates/${id}/points/${pointId}/comments/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [UPDATES],
    }),
    clearUpdate: builder.mutation({
      query: ({ id }) => {
        return {
          url: `updates/${id}/clear`,
          method: "PATCH",
        };
      },
      invalidatesTags: [UPDATES],
    }),
    getMemberUpdates: builder.query({
      query: ({ memberId }) => ({
        url: `updates?memberId=${memberId}`,
        method: "GET",
      }),
      providesTags: [UPDATES],
    }),
  }),
});

export const {
  useShareUpdateMutation,
  useEditUpdateMutation,
  useGetUpdatesQuery,
  useGetSingleUpdateQuery,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useClearUpdateMutation,
  useGetMemberUpdatesQuery,
} = updatesApi;

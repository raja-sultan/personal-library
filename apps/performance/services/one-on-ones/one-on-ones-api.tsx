import {
  ONE_ON_ONES,
  generateTags,
  RESOURCES,
  ONE_ON_ONES_LOGS,
} from "@services/tags";
import { baseAPI } from "../base-api";

export const OneOnOnesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOneOnOneByIdHistory: builder.query({
      query: ({ ...params }) => ({
        url: `one-on-one/history`,
        method: "GET",
        params,
      }),
      providesTags: (oneOneOnesDATA) =>
        generateTags(oneOneOnesDATA?.data?.data, ONE_ON_ONES),
    }),
    getOneOnOnesList: builder.query({
      query: ({ ...params }) => ({
        url: `one-on-one`,
        method: "GET",
        params,
      }),
      providesTags: (oneOneOnesDATA) =>
        generateTags(oneOneOnesDATA?.data?.oneOnOnes, ONE_ON_ONES),
    }),
    createOneOnOne: builder.mutation({
      query: ({ body }) => {
        return {
          url: `one-on-one`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [ONE_ON_ONES],
    }),
    viewOneOnOneDetails: builder.query({
      query: ({ id, meetingId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES],
    }),
    getOneOnOneCategory: builder.query({
      query: () => ({
        url: `resources?type=one_on_one_category`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES, RESOURCES],
    }),
    getOneOnOneSuggestedDiscussionPoints: builder.query({
      query: ({ ...params }) => ({
        url: `one-on-one-template/event-points?recurring=false`,
        method: "GET",
        params,
      }),
      providesTags: [ONE_ON_ONES],
    }),
    getOneOnOneTemplate: builder.query({
      query: ({ ...params }) => ({
        url: `one-on-one-template`,
        method: "GET",
        params,
      }),
      providesTags: [ONE_ON_ONES],
    }),
    addDiscussionPoint: builder.mutation({
      query: ({ id, meetingId, type, suggestedPointId, body }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points?type=${type}${
          suggestedPointId ? `&suggestedPointId=${suggestedPointId}` : ""
        } `,
        method: "POST",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    updateNotesAndRating: builder.mutation({
      query: ({ id, body }) => ({
        url: `one-on-one/${id}/notes-and-rating`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    endOneOnOne: builder.mutation({
      query: ({ id }) => ({
        url: `one-on-one/${id}/end`,
        method: "PATCH",
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    patchOneOnOneByIdMeetingsCancel: builder.mutation({
      query: ({ id, meetingId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: [ONE_ON_ONES, ONE_ON_ONES_LOGS],
    }),
    deleteDiscussionActionItemPoint: builder.mutation({
      query: ({ id, meetingId, pointId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    updateMeetingPoint: builder.mutation({
      query: ({ id, meetingId, pointId, payload }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    deleteOneOnOneByIdMeetingsAndMeetingId: builder.mutation({
      query: ({ id, meetingId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),

    //Comments APIs
    getAllComments: builder.query({
      query: ({ id, meetingId, pointId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}/comments`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES],
    }),
    addComment: builder.mutation({
      query: ({ id, meetingId, pointId, body }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    updateComment: builder.mutation({
      query: ({ id, meetingId, pointId, commentId, body }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}/comments/${commentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    deleteComment: builder.mutation({
      query: ({ id, meetingId, pointId, commentId }) => ({
        url: `one-on-one/${id}/meetings/${meetingId}/points/${pointId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ONE_ON_ONES],
    }),
    getOneOnOneApplyUser: builder.query({
      query: () => ({
        url: `one-on-one-template/user-for-apply-templates`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES],
    }),
  }),
});

export const {
  useCreateOneOnOneMutation,
  useGetOneOnOneByIdHistoryQuery,
  useGetOneOnOnesListQuery,
  useViewOneOnOneDetailsQuery,
  useGetOneOnOneCategoryQuery,
  useGetOneOnOneSuggestedDiscussionPointsQuery,
  useGetOneOnOneTemplateQuery,
  useAddDiscussionPointMutation,
  useUpdateNotesAndRatingMutation,
  useEndOneOnOneMutation,
  usePatchOneOnOneByIdMeetingsCancelMutation,
  useDeleteDiscussionActionItemPointMutation,
  useUpdateMeetingPointMutation,
  useGetAllCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useDeleteOneOnOneByIdMeetingsAndMeetingIdMutation,
  useGetOneOnOneApplyUserQuery,
} = OneOnOnesApi;

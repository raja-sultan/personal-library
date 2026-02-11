import { USER_REVIEW } from "@services/tags";
import { baseAPI } from "../base-api";
// import { DEPARTMENTS, generateTags } from "../tags";

export const userReviewApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserReview: builder.query({
      query: ({ ...params }) => ({
        url: `/user-review`,
        method: "GET",
        params,
      }),
      providesTags: [USER_REVIEW],
    }),
    getUserReviewId: builder.query({
      query: ({ id }) => ({
        url: `/user-review/${id}`,
        method: "GET",
      }),
      providesTags: [USER_REVIEW],
    }),
    getUserReviewTemplateId: builder.query({
      query: ({ id }) => ({
        url: `/user-review/${id}/reviewType`,
        method: "GET",
      }),
      providesTags: [USER_REVIEW],
    }),
    updateUserReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `user-review/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [USER_REVIEW],
    }),
    postNominateUser: builder.mutation({
      query: (data) => ({
        url: `/user-review/nominateUser`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [USER_REVIEW],
    }),
    getNominateUser: builder.query({
      query: ({ reviewCycleId, reviewType }) => ({
        url: `/user-review/getNominateUser/${reviewCycleId}?reviewType=${reviewType}`,
        method: "GET",
      }),
      providesTags: [USER_REVIEW],
    }),
    putNominateUser: builder.mutation({
      query: (data) => ({
        url: `/user-review/nominateUser`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [USER_REVIEW],
    }),
    getUserReviewMemberId: builder.query({
      query: ({ params }) => ({
        url: `/user-review`,
        method: "GET",
        params
      }),
      providesTags: [USER_REVIEW],
    }),
    getPeerSelection: builder.query({
      query: () => ({
        url: '/review-cycles/peers-list',
        method: "GET",
      }),
      providesTags: [USER_REVIEW],
    }),
  }),
});

export const {
  useGetUserReviewQuery,
  useGetUserReviewIdQuery,
  useGetUserReviewTemplateIdQuery,
  useUpdateUserReviewMutation,
  usePutNominateUserMutation,
  useGetNominateUserQuery,
  usePostNominateUserMutation,
  useGetUserReviewMemberIdQuery,
  useGetPeerSelectionQuery,
} = userReviewApi;

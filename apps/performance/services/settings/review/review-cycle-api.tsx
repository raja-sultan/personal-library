import { baseAPI } from "@services/base-api";
import { REVIEW_CYCLE, TEMPLATES } from "@services/tags";

export const reviewCycleApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReviewCycles: builder.query({
      query: ({ ...params }) => ({
        url: `/review-cycles`,
        method: "GET",
        params
      }),
      providesTags: [REVIEW_CYCLE],
    }),
    getReviewCycleById: builder.query({
      query: ({ id }) => ({
        url: `/review-cycles/${id}`,
        method: "GET",
      }),
      providesTags: [REVIEW_CYCLE],
    }),
    updateReviewCycleById: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/review-cycles/update/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    duplicateReviewCycle: builder.mutation({
      query: ({ id }) => ({
        url: `/review-cycles/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    deleteReviewCycle: builder.mutation({
      query: ({ id }) => ({
        url: `/review-cycles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    addReviewCycle: builder.mutation({
      query: ({ payload }) => ({
        url: `/review-cycles`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    getReviewTemplates: builder.query({
      query: () => ({
        url: `/reference-data/lookup?type=templates`,
        method: "GET",
      }),
      providesTags: [REVIEW_CYCLE],
    }),
    getReviewCycleProgressById: builder.query({
      query: ({ id }) => ({
        url: `/review-cycles/progress/${id}`,
        method: "GET",
      }),
      providesTags: [REVIEW_CYCLE],
    }),
    getReviewTemplateQuestionById: builder.query({
      query: ({ id }) => ({
        url: `/review-templates/${id}`,
        method: "GET",
      }),
      providesTags: [REVIEW_CYCLE, TEMPLATES],
    }),
    addReviewCycleReminder: builder.mutation({
      query: ({ body }) => ({
        url: `/review-cycles/reminder`,
        method: "POST",
        body
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    deleteUserReview: builder.mutation({
      query: ({ id }) => ({
        url: `/user-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [REVIEW_CYCLE],
    }),
    getNominationCount: builder.query({
      query: ({ userReviewType, reviewStatus, reviewCycleId, reviewerId }) => ({
        url: `/review-cycles/reviewer/nomination/count/${reviewerId}?userReviewType=${userReviewType}&reviewStatus=${reviewStatus}&reviewCycleId=${reviewCycleId}`,
        method: "GET",
      }),
      providesTags: [REVIEW_CYCLE],
    }),
  })
})

export const {
  useGetReviewCyclesQuery,
  useDuplicateReviewCycleMutation,
  useDeleteReviewCycleMutation,
  useAddReviewCycleMutation,
  useGetReviewTemplatesQuery,
  useGetReviewCycleByIdQuery,
  useLazyGetReviewCycleByIdQuery,
  useUpdateReviewCycleByIdMutation,
  useGetReviewCycleProgressByIdQuery,
  useGetReviewTemplateQuestionByIdQuery,
  useAddReviewCycleReminderMutation,
  useDeleteUserReviewMutation,
  useLazyGetNominationCountQuery
} = reviewCycleApi;






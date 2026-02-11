import { baseAPI } from "@services/base-api";
import { SCORE_CARD } from "@services/tags";

export const scoreCardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getScoreCard: builder.query({
      query: ({ jobId }) => ({
        url: `jobs/details/${jobId}`,
        method: "GET",
      }),
      providesTags: [SCORE_CARD],
    }),
    postCategory: builder.mutation({
      query: (payload) => ({
        url: `jobs/scorecard/category/${payload.jobId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [SCORE_CARD],
    }),
    getScoreCardById: builder.query({
      query: ({ categoryId, jobId }) => ({
        url: `jobs/scorecard/category/${categoryId}/${jobId}`,
        method: "GET",
      }),
      providesTags: [SCORE_CARD],
    }),
    deleteCategory: builder.mutation({
      query: (payload) => ({
        url: `jobs/scoreboard/category/${payload.categoryId}/${payload.jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: [SCORE_CARD],
    }),
    putAttributes: builder.mutation({
      query: (payload) => ({
        url: `jobs/scorecard/category/${payload.categoryId}/${payload.jobId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: [SCORE_CARD],
    }),
    putFocusAttributes: builder.mutation({
      query: (payload: any) => ({
        url: `jobs/score-card/update-focus-attributes`,
        method: "PUT",
        body: payload.params,
      }),
      invalidatesTags: [SCORE_CARD],
    }),
  }),
});

export const {
  useGetScoreCardQuery,
  useLazyGetScoreCardQuery,
  usePostCategoryMutation,
  useDeleteCategoryMutation,
  usePutAttributesMutation,
  useLazyGetScoreCardByIdQuery,
  usePutFocusAttributesMutation,
} = scoreCardApi;

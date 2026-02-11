import { baseAPI } from "@services/base-api";
import { FEEDBACKS, generateTags } from "@services/tags";

export const feedbacksAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackList: builder.query({
      query: ({ ...params }) => ({
        url: `feedbacks`,
        method: "GET",
        params,
      }),
      providesTags: (result) => generateTags(result?.data?.data, FEEDBACKS),
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: "feedbacks",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [FEEDBACKS],
    }),
    giveFeedbackReaction: builder.mutation({
      query: ({ id, reactions }) => ({
        url: `feedbacks/${id}/reaction/?reactions=${reactions}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [FEEDBACKS],
    }),
    deleteFeedback: builder.mutation({
      query: ({ id }) => ({
        url: `feedbacks/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [FEEDBACKS],
    }),
    declineFeedback: builder.mutation({
      query: ({ id }) => ({
        url: `feedbacks/${id}/decline`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [FEEDBACKS],
    }),
  }),
});

export const {
  useAddFeedbackMutation,
  useGetFeedbackListQuery,
  useGiveFeedbackReactionMutation,
  useDeleteFeedbackMutation,
  useDeclineFeedbackMutation,
} = feedbacksAPI;

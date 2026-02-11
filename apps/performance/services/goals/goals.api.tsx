import { GOALS, PROFILE } from "@services/tags";
import { baseAPI } from "../base-api";

export const goalsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createGoals: builder.mutation({
      query: (queryArg) => ({
        url: "goals",
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [GOALS],
    }),
    updateGoals: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/goals/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: [GOALS],
    }),
    getGoals: builder.query({
      query: ({ ...params }) => ({
        url: "/goals",
        method: "GET",
        params,
      }),
      providesTags: [GOALS],
    }),
    getGoalById: builder.query({
      query: ({ id }) => ({
        url: `/goals/${id}`,
        method: "GET",
      }),
      providesTags: [GOALS],
    }),
    getOwnerDetails: builder.query({
      query: ({ id }) => ({
        url: `/goals/${id}`,
        method: "GET",
      }),
      providesTags: [GOALS],
    }),
    deleteGoal: builder.mutation({
      query: ({ id }) => ({
        url: `goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GOALS, PROFILE],
    }),
    addKeyResultOfGoal: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `goals/${id}/key-results`,
        method: "POST",
        body,
      }),
      invalidatesTags: [GOALS],
    }),
    updateKeyResult: builder.mutation({
      query: ({ id, keyResultId, body }) => ({
        url: `/goals/${id}/key-results/${keyResultId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [GOALS],
    }),
    getKeyResultByKeyResultId: builder.query({
      query: ({ id, keyResultId }) => ({
        url: `/goals/${id}/key-results/${keyResultId}`,
        method: "GET",
      }),
      providesTags: [GOALS],
    }),
    deleteKeyResultById: builder.mutation({
      query: ({ id, keyResultId }) => ({
        url: `/goals/${keyResultId}/key-results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GOALS],
    }),
    getKeyResultByGoalId: builder.query({
      query: ({ id }) => ({
        url: `/goals/${id}/key-results?limit=10&offset=0`,
        method: "GET",
      }),
      providesTags: [GOALS],
    }),
    getGoalTimeline: builder.query({
      query: ({ id }) => ({
        url: `/goals/${id}/timeline`,
        method: "GET",
      }),
      providesTags: [GOALS],
    }),
    updateKeyResultCheckIn: builder.mutation({
      query: ({ id, keyResultId, body }) => ({
        url: `/goals/${id}/key-results/${keyResultId}/check-in`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [GOALS],
    }),
  }),
});

export const {
  useCreateGoalsMutation,
  useGetGoalsQuery,
  useLazyGetGoalByIdQuery,
  useDeleteGoalMutation,
  useAddKeyResultOfGoalMutation,
  useGetOwnerDetailsQuery,
  useGetKeyResultByGoalIdQuery,
  useGetGoalTimelineQuery,
  useUpdateGoalsMutation,
  useUpdateKeyResultMutation,
  useGetKeyResultByKeyResultIdQuery,
  useDeleteKeyResultByIdMutation,
  useUpdateKeyResultCheckInMutation,
} = goalsApi;

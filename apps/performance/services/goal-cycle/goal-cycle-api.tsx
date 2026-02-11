import { baseAPI } from "@services/base-api";
import { GOALS_CYCLE } from "@services/tags";

export const goalCycleApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getGoalCycles: builder.query({
      query: ({ ...params }) => ({
        url: "goal-cycles",
        method: "GET",
        params,
      }),
      providesTags: [GOALS_CYCLE],
    }),
    postGoalCycle: builder.mutation({
      query: (payload) => ({
        url: "goal-cycles",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [GOALS_CYCLE],
    }),
    getGoalById: builder.query({
      query: ({ id }) => ({
        url: `goal-cycles/${id}`,
        method: "GET",
      }),
      providesTags: [GOALS_CYCLE],
    }),
    putSingleGoal: builder.mutation({
      query: ({ id, payload }) => ({
        url: `goal-cycles/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [GOALS_CYCLE],
    }),
    deleteGoal: builder.mutation({
      query: ({ id }) => ({
        url: `goal-cycles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GOALS_CYCLE],
    }),
    patchGoalById: builder.mutation({
      query: ({ id, payload }) => ({
        url: `goal-cycles/${id}/mark`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [GOALS_CYCLE],
    }),
  }),
});

export const {
  useGetGoalCyclesQuery,
  usePostGoalCycleMutation,
  useGetGoalByIdQuery,
  usePutSingleGoalMutation,
  useDeleteGoalMutation,
  usePatchGoalByIdMutation,
} = goalCycleApi;

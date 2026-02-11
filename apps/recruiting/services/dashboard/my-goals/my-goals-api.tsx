import { baseAPI } from "@services/base-api";
import { DASHBOARD } from "@services/tags";

const MyGoalsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postMyGoal: builder.mutation({
      query: (payload) => ({
        url: `dashboard/create-my-goal`,
        method: "POST",
        params: payload.params,
      }),
      invalidatesTags: [DASHBOARD],
    }),
    updateMyGoalById: builder.mutation<null, any>({
      query: ({ id }: any) => ({
        url: `/dashboard/update-my-goals/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [DASHBOARD],
    }),
  }),
});

export const { usePostMyGoalMutation, useUpdateMyGoalByIdMutation } =
  MyGoalsApi;

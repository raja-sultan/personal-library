import { baseAPI } from "@services/base-api";
import { PERSONALIZED_DASHBOARD } from "@services/tags";

const PersonalizedDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalizedDashboard: builder.query({
      query: () => ({
        url: "dashboard/personalize-dashboard",
        method: "GET",
      }),
      providesTags: [PERSONALIZED_DASHBOARD],
    }),
    putTheDashboard: builder.mutation({
      query: (payload) => ({
        url: "dashboard/personalize-dashboard",
        method: "PUT",
        body: payload.params,
      }),
      invalidatesTags: [PERSONALIZED_DASHBOARD],
    }),
  }),
});

export const { useGetPersonalizedDashboardQuery, usePutTheDashboardMutation } =
  PersonalizedDashboardApi;

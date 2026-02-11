import { baseAPI } from "@services/base-api";
import { COMPENSATION_CYCLE_VIEW_DETAILS } from "@services/tags";

export const compensationCycleViewDetailsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTeamResult: builder.query({
      query: ({ id }) => ({
        url: `compensation-cycles/${id}/team-results`,
        method: "GET",
      }),
      providesTags: [COMPENSATION_CYCLE_VIEW_DETAILS],
    }),
    getCompanyResults: builder.query({
      query: ({ id }) => ({
        url: `compensation-cycles/${id}/company-results`,
        method: "GET",
      }),
      providesTags: [COMPENSATION_CYCLE_VIEW_DETAILS],
    }),
    getSingleTeamResult: builder.query({
      query: ({ id, userId }) => ({
        url: `compensation-cycles/${id}/results${userId ? `?userId=${userId}` : ''}`,
        method: "GET",
      }),
      providesTags: [COMPENSATION_CYCLE_VIEW_DETAILS],
    }),

    getShareTeamResult: builder.mutation({
      query: ({ payload }) => {
        const userId = payload?.userId;
        const id = payload?.id;
        const shared = payload?.shared;

        const url = userId
          ? `compensation-cycles/${id}/team-results/share?shared=${shared}&userId=${userId}`
          : `compensation-cycles/${id}/team-results/share?shared=${shared}`;

        return {
          url,
          method: "PATCH",
        };
      },
      invalidatesTags: [COMPENSATION_CYCLE_VIEW_DETAILS],
    }),
  }),
});

export const {
  useGetTeamResultQuery,
  useGetCompanyResultsQuery,
  useGetSingleTeamResultQuery,
  useLazyGetSingleTeamResultQuery,
  useGetShareTeamResultMutation,
} = compensationCycleViewDetailsApi;

;

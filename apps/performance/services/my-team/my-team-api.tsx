import { baseAPI } from "@services/base-api";
import { MY_TEAMS } from "@services/tags";

export const teamApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    myTeamOverview: builder.query({
      query: () => ({
        url: `/my-team/success-overview`,
        method: "GET",
      }),
      providesTags: [MY_TEAMS],
    }),
    myTeamOneOnOnes: builder.query({
      query: ({ ...params }) => ({
        url: `/my-team/one-on-one`,
        method: "GET",
        params
      }),
      providesTags: [MY_TEAMS],
    }),
    getMyTeam: builder.query({
      query: ({ ...params }) => ({
        url: `/my-team`,
        method: "GET",
        params,
      }),
      providesTags: [MY_TEAMS],
    }),
  }),
});

export const { useMyTeamOverviewQuery, useGetMyTeamQuery, useMyTeamOneOnOnesQuery } = teamApi;

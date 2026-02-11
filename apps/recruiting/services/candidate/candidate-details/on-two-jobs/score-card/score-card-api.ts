import { baseAPI } from "@services/base-api";
import { OVER_ALL_RECOMMENDATIONS } from "@services/tags";

export const recommendationsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: ({ payload }: any) => ({
        url: `candidates/overall-recommendations-scorecards-list/${payload.jobId}/${payload.candidateId}`,
        method: "GET",
      }),
      providesTags: [OVER_ALL_RECOMMENDATIONS],
    }),
    scoreCardDetails: builder.query({
      query: ({ payload }: any) => ({
        url: "candidates/get-scorecard-details",
        method: "GET",
        params: payload,
      }),
      providesTags: [OVER_ALL_RECOMMENDATIONS],
    }),
  }),
});

export const { useGetRecommendationsQuery, useScoreCardDetailsQuery } =
  recommendationsApi;

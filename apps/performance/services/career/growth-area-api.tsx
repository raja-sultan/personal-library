import { baseAPI } from "@services/base-api";
import { PLANS } from "@services/tags";

export const growthAreaApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCareerGrowthSkills: builder.query({
      query: () => ({
        url: `/career-growth/user-skills`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    getCareerGrowth: builder.query({
      query: ({ planId, skillId }) => ({
        url: `/career-growth?planId=${planId}&skillId=${skillId}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    getCurrentLevel: builder.query({
      query: ({ planId }) => ({
        url: `/career-growth/currentLevels/${planId}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),

    postCareerGrowth: builder.mutation({
      query: ({ payload }) => ({
        url: `/career-growth`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [PLANS],
    }),
  }),
});

export const {
  usePostCareerGrowthMutation,
  useGetCareerGrowthQuery,
  useGetCareerGrowthSkillsQuery,
  useGetCurrentLevelQuery,
} = growthAreaApi;

import { baseAPI } from "@services/base-api";
import { STAGE_TRANSITION } from "@services/tags";

export const StageTransitionApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStagesRule: builder.query({
      query: ({ jobId }) => {
        return {
          url: `jobs/list-stages-rules?job_id=${jobId}`,
        };
      },
      providesTags: [STAGE_TRANSITION],
    }),
    getStagesTransitionRule: builder.query({
      query: ({ params }) => {
        return {
          url: `jobs/list-stage-transition-rule/${params?.jobId}`,
        };
      },
      transformResponse: (response: any) => {
        return typeof response?.data === "object" ? response?.data : [];
      },
    }),

    addStageTransitionRule: builder.mutation({
      query: ({ payload }) => ({
        url: `jobs/create-stage-transition-rule`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [STAGE_TRANSITION],
    }),

    deleteStageTransitionRule: builder.mutation({
      query: ({ ruleId }) => ({
        url: `jobs/delete-stage-transition-rule`,
        method: "DELETE",
        body: {
          ruleId,
        },
      }),
      invalidatesTags: [STAGE_TRANSITION],
    }),
  }),
});

export const {
  useGetStagesRuleQuery,
  useGetStagesTransitionRuleQuery,
  useLazyGetStagesTransitionRuleQuery,
  useAddStageTransitionRuleMutation,
  useDeleteStageTransitionRuleMutation,
} = StageTransitionApi;

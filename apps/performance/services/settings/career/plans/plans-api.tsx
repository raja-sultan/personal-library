import { baseAPI } from "@services/base-api";
import { PLANS } from "@services/tags";

export const plansApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCareerPlans: builder.query({
      query: ({ ...params }) => ({
        url: `/career-plan`,
        method: "GET",
        params
      }),
      providesTags: [PLANS],
    }),
    deletePlan: builder.mutation({
      query: ({ id }) => ({
        url: `/career-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PLANS],
    }),
    duplicatePlan: builder.mutation({
      query: ({ id }) => ({
        url: `/career-plan/${id}/duplicate`,
        method: "PUT",
      }),
      invalidatesTags: [PLANS],
    }),
    singleTemplateData: builder.query({
      query: ({ id }) => ({
        url: `/career-plan/${id}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    singleCareerGrowth: builder.query({
      query: ({ growthId }) => ({
        url: `/career-growth/${growthId}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    publishUnPublishPlan: builder.mutation({
      query: ({ id, status }) => ({
        url: `/career-plan/${id}/status`,
        method: "PUT",
        params: { status }
      }),
      invalidatesTags: [PLANS],
    }),
    growthStatusChange: builder.mutation({
      query: ({ id, body }) => ({
        url: `/career-growth/completed/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [PLANS],
    }),
    deleteGrowth: builder.mutation({
      query: ({ growthId, }) => ({
        url: `/career-growth/${growthId}`,
        method: "DELETE",
      }),
      invalidatesTags: [PLANS],
    }),
    growthActions: builder.mutation({
      query: ({ id, body }) => ({
        url: `/career-growth/action/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [PLANS],
    }),
    growthPostComment: builder.mutation({
      query: ({ body }) => ({
        url: '/career-growth/comment',
        method: "POST",
        body
      }),
      invalidatesTags: [PLANS],
    }),
    careerViewComment: builder.query({
      query: ({ growthId }) => ({
        url: `/career-growth/view/comments?growthId=${growthId}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    deleteGrowthAction: builder.mutation({
      query: (id) => ({
        url: `/career-growth/actionId/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PLANS],
    }),
    addGrowthAction: builder.mutation({
      query: ({ id, body }) => ({
        url: `/career-growth/action/${id}`,
        method: "POST",
        body
      }),
      invalidatesTags: [PLANS],
    }),
    editGrowthDetails: builder.mutation({
      query: ({ growthId, body }) => ({
        url: `/career-growth/${growthId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [PLANS],
    }),
  }),
});

export const {
  useGetCareerPlansQuery,
  useDeletePlanMutation,
  useDuplicatePlanMutation,
  usePublishUnPublishPlanMutation,
  useSingleTemplateDataQuery,
  useSingleCareerGrowthQuery,
  useGrowthStatusChangeMutation,
  useDeleteGrowthMutation,
  useGrowthActionsMutation,
  useGrowthPostCommentMutation,
  useCareerViewCommentQuery,
  useDeleteGrowthActionMutation,
  useAddGrowthActionMutation,
  useEditGrowthDetailsMutation
} = plansApi;

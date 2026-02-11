import { baseAPI } from "@services/base-api";
import { PLANS } from "@services/tags";

export const plansApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createCareerGroups: builder.mutation({
      query: ({ ...body }) => ({
        url: `/career-groups`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PLANS],
    }),
    getCareerPlans: builder.query({
      query: ({limit, offset, listingType}) => ({
        url: `/career-plan`,
        method: "GET",
        params: {limit, offset, listingType}
      }),
      providesTags: [PLANS],
    }),
    createCareerPlan: builder.mutation({
      query: ({ ...body }) => ({
        url: `/career-plan`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PLANS],
    }),
    updateCareerPlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/career-plan/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [PLANS],
    }),
    getSkills: builder.query({
      query: ({ ...params }) => ({
        url: `/skills`,
        method: "GET",
        params
      }),
      providesTags: [PLANS],
    }),
    createSkills: builder.mutation({
      query: ({ ...body }) => ({
        url: `/skills`,
        method: "POST",
        body,
      }),
    }),
    updateSkills: builder.mutation({
      query: ({ id, body }) => ({
        url: `/skills/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PLANS],
    }),
    getSingleCareerPlan: builder.query({
      query: ({ _id }) => ({
        url: `/career-plan/${_id}`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
    getCareerPlanByIdEmployee: builder.query({
      query: ({ id }) => ({
        url: `/career-plan/${id}/employees`,
        method: "GET",
      }),
      providesTags: [PLANS],
    }),
  }),
});

export const {
  useCreateCareerGroupsMutation,
  useCreateCareerPlanMutation,
  useUpdateCareerPlanMutation,
  useGetSkillsQuery,
  useCreateSkillsMutation,
  useUpdateSkillsMutation,
  useGetSingleCareerPlanQuery,
  useLazyGetSingleCareerPlanQuery,
  useGetCareerPlanByIdEmployeeQuery,
} = plansApi;
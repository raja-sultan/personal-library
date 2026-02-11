import { baseAPI } from "@services/base-api";
import { CAREER_SKILLS } from "@services/tags";

export const careerSkillsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createSkills: builder.mutation({
      query: (queryArg) => ({
        url: "skills",
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),
    getCareerPlansId: builder.query({
      query: ({ id }) => ({
        url: `/career-plan/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS],
    }),
    getCareerSkills: builder.query({
      query: ({ ...params }) => ({
        url: "/skills",
        method: "GET",
        params,
      }),
      providesTags: [CAREER_SKILLS],
    }),
    getSkillsById: builder.query({
      query: ({ id }) => ({
        url: `skills/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS]
    }),

    getCareerPlan: builder.query({
      query: ({ type }) => ({
        url: `reference-data/lookup?type=${type}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS],
    }),

    // getCareerPlans: builder.query({
    //   query: ({type}) => ({
    //     url:`reference-data/lookup?type=${type}`,
    //     method: "GET",
    //   }),
    //   providesTags: [CAREER_SKILLS],
    // }),
    deleteCareerSkill: builder.mutation({
      query: ({ id }) => ({
        url: `skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),

    updateCreateSkills: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),
    viewCareerSkill: builder.query({
      query: ({ id}) => ({
        url: `/skills/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS],
    }),

    createCategories: builder.mutation({
      query: (queryArg) => ({
        url: "categories",
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),
    getCategories: builder.query({
      query: ({ ...params }) => ({
        url: `/categories`,
        method: "GET",
        params,
      }),
      providesTags: [CAREER_SKILLS],
    }),
    getCategoriesById: builder.query({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS]
    }),
    updateCreateCategories: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),
    viewCategories: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_SKILLS],
    }),

    deleteCategories: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [CAREER_SKILLS],
    }),

    getLibrary: builder.query({
      query: ({ ...params }) => ({
        url: `/library`,
        method: "GET",
        params,
      }),
      providesTags: [CAREER_SKILLS],
    }),
  }),
});

export const {
  useCreateSkillsMutation,
  useGetCareerSkillsQuery,
  useGetCareerPlanQuery,
  useDeleteCareerSkillMutation,
  useUpdateCreateSkillsMutation,
  useUpdateCreateCategoriesMutation,
  useGetCategoriesQuery,
  useGetLibraryQuery,
  useLazyGetSkillsByIdQuery,
  useLazyGetCategoriesByIdQuery,
  useCreateCategoriesMutation,
  useDeleteCategoriesMutation,
  useViewCategoriesQuery,
  useGetCareerPlansIdQuery,
  useViewCareerSkillQuery
} = careerSkillsApi;

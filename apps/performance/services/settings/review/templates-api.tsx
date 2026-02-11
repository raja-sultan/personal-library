import { baseAPI } from "@services/base-api";
import { TEMPLATES, generateTags } from "@services/tags";

export const templateApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    addQuestions: builder.mutation({
      query: (queryArg) => ({
        url: "questionnaires",
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [TEMPLATES],
    }),

    updateTemplate: builder.mutation({
      query: ({ data, id }) => ({
        url: `/review-templates/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [TEMPLATES],
    }),

    createTemplate: builder.mutation({
      query: (createTemplate) => ({
        url: "/review-templates",
        method: "POST",
        body: createTemplate,

      }),
      invalidatesTags: [TEMPLATES],
    }),

    templateList: builder.query({
      query: ({ limit, offset, searchValue }) => ({
        url: `/review-templates?search=${searchValue}&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: (result) => generateTags(result?.data?.templates, TEMPLATES),
    }),

    templateView: builder.query({
      query: ({ id }) => ({
        url: `/review-templates/${id}`,
        method: "GET",
      }),
      providesTags: [TEMPLATES],
    }),

    templateDuplicate: builder.mutation({
      query: ({ id }) => ({
        url: `/review-templates/${id}/duplicate`,
        method: "POST",
      }),
      invalidatesTags: [TEMPLATES],
    })
  })
})
export const { useTemplateListQuery, useTemplateViewQuery, useTemplateDuplicateMutation, useCreateTemplateMutation, useAddQuestionsMutation, useUpdateTemplateMutation } = templateApi;






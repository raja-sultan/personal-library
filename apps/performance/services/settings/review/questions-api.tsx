import { baseAPI } from "@services/base-api";
import { QUESTIONNAIRES } from "@services/tags";

export const questionsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    questionnairesList: builder.query({
      query: ({ ...queryParams }) => ({
        url: `/questionnaires`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: [QUESTIONNAIRES],
    }),

    duplicatQuestion: builder.mutation({
      query: ({ id }) => ({
        url: `/questionnaires/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: [QUESTIONNAIRES],
    }),
    addQuestionnaires: builder.mutation({
      query: (question) => ({
        url: "/questionnaires",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      }),
      invalidatesTags: [QUESTIONNAIRES],
    }),
    editQuestionnaires: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/questionnaires/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: [QUESTIONNAIRES],
    }),

    deleteQuestionnaires: builder.mutation({
      query: ({ id }) => ({
        url: `/questionnaires/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUESTIONNAIRES],
    }),
  }),
});

export const {
  useDeleteQuestionnairesMutation,
  useEditQuestionnairesMutation,
  useAddQuestionnairesMutation,
  useQuestionnairesListQuery,
  useDuplicatQuestionMutation,
} = questionsAPI;

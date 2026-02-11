import { baseAPI } from "@services/base-api";
import { UPDATES_SETTINGS } from "@services/tags";

export const updatesSettingApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUpdatesSettingQuestions: builder.query({
      query: ({ questionType }) => ({
        url: `/update-question?questionType=${questionType}`,
        method: "GET",
      }),
      providesTags: [UPDATES_SETTINGS],
    }),

    postUpdatesSettingQuestions: builder.mutation({
      query: ({ body }) => ({
        url: `/update-question`,
        method: "POST",
        body,
      }),
      invalidatesTags: [UPDATES_SETTINGS],
    }),

    putUpdatesSettingQuestions: builder.mutation({
      query: ({ body, id }) => ({
        url: `/update-question/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [UPDATES_SETTINGS],
    }),

    deleteUpdatesSettingQuestions: builder.mutation({
      query: ({ id }) => ({
        url: `/update-question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [UPDATES_SETTINGS],
    }),

    postUpdatesSetting: builder.mutation({
      query: ({ body }) => ({
        url: `/settings/updates-setting`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [UPDATES_SETTINGS],
    }),
  }),
});

export const {
  useDeleteUpdatesSettingQuestionsMutation,
  useGetUpdatesSettingQuestionsQuery,
  usePostUpdatesSettingQuestionsMutation,
  usePutUpdatesSettingQuestionsMutation,
  usePostUpdatesSettingMutation,
} = updatesSettingApi;

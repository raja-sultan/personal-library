import { baseAPI } from "@services/base-api";
import { MANAGE_INTERVIEWER_TAGS } from "@services/tags";

export const interviewerTagsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewerTagsList: builder.query({
      query: (payload) => {
        return {
          url: `configuration/interviewer-tags/list`,
          method: "GET",
          params: payload?.params,
        };
      },
      providesTags: [MANAGE_INTERVIEWER_TAGS],
    }),
    postInterviewerTags: builder.mutation({
      query: (body) => {
        return {
          url: `configuration/create-interviewer-tags`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [MANAGE_INTERVIEWER_TAGS],
    }),
    deleteInterviewerTags: builder.mutation({
      query: (tagId) => {
        return {
          url: `configuration/delete-interviewer-tag/${tagId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [MANAGE_INTERVIEWER_TAGS],
    }),
    updateInterviewerTags: builder.mutation({
      query: ({ tagId, formValues }) => {
        return {
          url: `configuration/update-interviewer-tags/${tagId}`,
          method: "PUT",
          body: formValues,
        };
      },
      invalidatesTags: [MANAGE_INTERVIEWER_TAGS],
    }),
  }),
});

export const {
  useGetInterviewerTagsListQuery,
  usePostInterviewerTagsMutation,
  useDeleteInterviewerTagsMutation,
  useUpdateInterviewerTagsMutation,
  useLazyGetInterviewerTagsListQuery,
} = interviewerTagsApi;

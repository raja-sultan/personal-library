import { baseAPI } from "@services/base-api";
import { CANDIDATE_TAGS } from "@services/tags";

export const candidateTagsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateTagList: builder.query({
      query: (payload) => {
        return {
          url: `configuration/candidate-tag/list`,
          method: "GET",
          params: payload?.params,
        };
      },
      providesTags: [CANDIDATE_TAGS],
    }),
    postCandidateTag: builder.mutation({
      query: (body) => {
        return {
          url: `configuration/candidate-tag/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [CANDIDATE_TAGS],
    }),
    deleteCandidateTag: builder.mutation({
      query: (tagId) => {
        return {
          url: `configuration/candidate-tag/delete?tagId=${tagId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [CANDIDATE_TAGS],
    }),
    updateCandidateTag: builder.mutation({
      query: ({ tagId, formValues }) => {
        return {
          url: `configuration/candidate-tag/update?tagId=${tagId}`,
          method: "PUT",
          body: formValues,
        };
      },
      invalidatesTags: [CANDIDATE_TAGS],
    }),
  }),
});

export const {
  useGetCandidateTagListQuery,
  usePostCandidateTagMutation,
  useDeleteCandidateTagMutation,
  useUpdateCandidateTagMutation,
} = candidateTagsApi;

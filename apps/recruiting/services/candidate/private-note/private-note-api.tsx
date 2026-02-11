import { baseAPI } from "@services/base-api";
import { PRIVATE_NOTE } from "@services/tags";

export const privateNoteAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get Api
    getPrivateNote: builder.query({
      query: ({ candidateId }) => ({
        url: `candidates/get-private-note/${candidateId}`,
        method: "GET",
      }),
      providesTags: [PRIVATE_NOTE],
    }),

    // Post Api
    postPrivateNote: builder.mutation({
      query: ({ payload }: any) => ({
        url: `candidates/add-private-note`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [PRIVATE_NOTE],
    }),

    // Delete Api
    deletePrivateNote: builder.mutation({
      query: ({ payload }) => ({
        url: `candidates/delete-private-note`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: [PRIVATE_NOTE],
    }),

    // update Api
    updatePrivateNote: builder.mutation({
      query: ({ payload }) => ({
        url: `candidates/update-private-note`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [PRIVATE_NOTE],
    }),
  }),
});

export const {
  useGetPrivateNoteQuery,
  usePostPrivateNoteMutation,
  useDeletePrivateNoteMutation,
  useUpdatePrivateNoteMutation,
} = privateNoteAPI;

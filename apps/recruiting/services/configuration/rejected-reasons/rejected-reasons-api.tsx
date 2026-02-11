import { baseAPI } from "@services/base-api";
import { REJECTED_REASONS } from "@services/tags";

const Tag = [REJECTED_REASONS];

const RejectedReasons = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllRejectedReasonsList: builder.query({
      query: (payload) => ({
        url: "/configuration/rejection-reason/list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    PostRejectedReasons: builder.mutation({
      query: (payload) => ({
        url: "/configuration/create-rejection-reason",
        method: "POST",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    UpdateRejectedReasons: builder.mutation({
      query: (payload) => ({
        url: `/configuration/update-rejection-reason/${payload.params.id}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    UpdateRejectedReasonsStatus: builder.mutation({
      query: (payload) => ({
        url: `/configuration/update-rejection-reason-status/${payload.params.id}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    DeleteRejectedReasons: builder.mutation({
      query: (payload) => ({
        url: `/configuration/delete-rejection-reason/${payload.params.id}`,
        method: "delete",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetAllRejectedReasonsListQuery,
  usePostRejectedReasonsMutation,
  useUpdateRejectedReasonsMutation,
  useUpdateRejectedReasonsStatusMutation,
  useDeleteRejectedReasonsMutation,
} = RejectedReasons;

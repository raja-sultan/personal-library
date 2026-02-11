import { baseAPI } from "@services/base-api";
import { PERMISSIONS } from "@services/tags";

const Tag = [PERMISSIONS];

const permission = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRoleListWithIDList: builder.query({
      query: (payload) => ({
        url: `/roles/${payload.role}/employees`,
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    patchRoleList: builder.mutation({
      query: (payload) => ({
        url: `/roles/${payload.role}/employees`,
        method: "PATCH",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    DeleteRoleList: builder.mutation({
      query: (payload) => ({
        url: `/roles/${payload.role}/employees`,
        method: "DELETE",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    getUsersList: builder.query({
      query: () => ({
        url: "/NewHire/get-users-dropdown",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetRoleListWithIDListQuery,
  useLazyGetRoleListWithIDListQuery,
  useGetUsersListQuery,
  useLazyGetUsersListQuery,
  usePatchRoleListMutation,
  useDeleteRoleListMutation,
} = permission;

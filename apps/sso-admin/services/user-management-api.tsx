import { baseAPI } from "@services/base-api";
import { UserManagementTag } from "./tags";

const Tag = [UserManagementTag];

const UserManagement = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (payload) => ({
        url: "/super-admin/system-admin/get-all-users",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/super-admin/reset-password",
        method: "POST",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    editCompanyUser: builder.mutation({
      query: (payload) => ({
        url: `/super-admin/company-user/update-user/${payload.params.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    superAdminChangeStatus: builder.mutation({
      query: (payload) => ({
        url: "/super-admin/system-admin/change-status",
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    addSystemAdmin: builder.mutation({
      query: (payload) => ({
        url: "/super-admin/add-user",
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    editSystemAdmin: builder.mutation({
      query: (payload) => ({
        url: `/super-admin/system-admin/update-user/${payload.params.userId}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useResetPasswordMutation,
  useEditCompanyUserMutation,
  useSuperAdminChangeStatusMutation,
  useAddSystemAdminMutation,
  useEditSystemAdminMutation,
} = UserManagement;

import { baseAPI } from "@services/base-api";
import { CompanyManagementTag } from "./tags";

const Tag = [CompanyManagementTag];

const CompanyManagement = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanyUsers: builder.query({
      query: (payload) => ({
        url: "/super-admin/company-user/get-all-users",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    createCompanyUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/approve-company",
        method: "POST",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    scheduleDemo: builder.mutation({
      query: (payload) => ({
        url: "/super-admin/user-schedule-demo",
        method: "POST",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    editCompanyManagement: builder.mutation({
      query: (payload) => ({
        url: `/super-admin/company-management/update-user/${payload.params.userId}`,
        method: "PATCH",
        body: payload.body,
        // params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetAllCompanyUsersQuery,
  useCreateCompanyUserMutation,
  useScheduleDemoMutation,
  useEditCompanyManagementMutation,
} = CompanyManagement;

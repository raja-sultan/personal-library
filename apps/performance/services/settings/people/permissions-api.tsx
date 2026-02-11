import { baseAPI } from "@services/base-api";
import { PERMISSIONS, generateTags } from "@services/tags";

export const permissionsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    permissionsList: builder.query({
      query: ({ ...params}) => ({
        url: `/roles`,
        method: "GET",
        params
      }),
      providesTags: [PERMISSIONS],
    }),
    addRole: builder.mutation({
      query: (body) => ({
        url: "roles",
        method: "POST",
        body,
      }),
      invalidatesTags: [PERMISSIONS],
      
    }),
    getRole: builder.query({
      query: ({ id }) => ({
        url: `roles/${id}`,
        method: "GET",
      }),
      providesTags: (result) => generateTags(result?.data?.data, PERMISSIONS),
    }),
    updateRole: builder.mutation({
      query: ({ id, body }) => ({
        url: `roles/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [PERMISSIONS],
    }),
    deleteRole: builder.mutation({
      query: ({ id }) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PERMISSIONS],
    }),
    getEmployeesByRole: builder.query({
      query: ({ id, ...params }) => ({
        url: `/roles/${id}/employees`,
        method: "GET",
        params
      }),
      providesTags: [PERMISSIONS],
    }),
    deleteEmployeeByRole: builder.mutation({
      query: ({ id, employeeId }) => ({
        url: `roles/${id}/employees?employeeId=${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [PERMISSIONS],
    }),
    updateEmployeesByRole: builder.mutation({
      query: ({ id, employeeIds }) => ({
        url: `roles/${id}/employees`,
        method: "PATCH",
        body: {
          employeeIds
        }
      }),
      invalidatesTags: [PERMISSIONS],
    }),
  }),
});

export const {
  usePermissionsListQuery,
  useLazyGetRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetEmployeesByRoleQuery,
  useDeleteEmployeeByRoleMutation,
  useUpdateEmployeesByRoleMutation
} = permissionsApi;

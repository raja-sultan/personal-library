import { baseAPI } from "../base-api";
import { DEPARTMENTS, generateTags } from "../tags";

export const departmentApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (queryArg) => ({
        url: "departments",
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    getDepartment: builder.query({
      query: ({ search, offset, limit }) => ({
        url: `/departments?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ""
          }`,
        method: "GET",
      }),
      providesTags: [DEPARTMENTS]
    }),
    editDepartment: builder.mutation({
      query: ({ id, department }) => ({
        url: `departments/${id}`,
        method: "PUT",
        body: department,
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    deleteDepartment: builder.mutation({
      query: ({ id }) => ({
        url: `departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    getDepartmentById: builder.query({
      query: ({ id, search }) => ({
        url: `departments/${id}`,
        method: "GET",
        params: { search }
      }),
      providesTags: [DEPARTMENTS]
    }),
    getMembersData: builder.query({
      query: ({ id, search, offset, limit }) => ({
        url: `departments/${id}/non-members?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ""
          }`,
        method: "GET",
      }),
      providesTags: (result) => generateTags(result?.data?.departments, DEPARTMENTS)

    }),
    addMembersData: builder.mutation({
      query: ({ id, userId }) => ({
        url: `departments/${id}/add`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    setDepartmentHeads: builder.mutation({
      query: ({ id, userId }) => ({
        url: `departments/${id}/set-head`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    deleteMemberUser: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `departments/${id}/remove?memberId=${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    deleteHeaderUser: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `departments/${id}/remove-head?memberId=${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    getEmployees: builder.query({
      query: () => ({
        url: `employees?limit=1000&offset=0`,
        method: "GET",
      }),
      providesTags: (result) => generateTags(result?.data?.departments, DEPARTMENTS)
    }),
    deleteHeadsDepartments: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `departments/${id}/set-head?memberId=${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: [DEPARTMENTS],
    }),
    employeeLookUp: builder.query({
      query: ({ ...query }) => ({
        url: `reference-data/lookup?type=employees`,
        method: "GET",
        params: query
      }),
      providesTags: [DEPARTMENTS]
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useEditDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentByIdQuery,
  useGetMembersDataQuery,
  useAddMembersDataMutation,
  useDeleteMemberUserMutation,
  useDeleteHeaderUserMutation,
  useGetEmployeesQuery,
  useSetDepartmentHeadsMutation,
  useDeleteHeadsDepartmentsMutation,
  useEmployeeLookUpQuery
} = departmentApi;

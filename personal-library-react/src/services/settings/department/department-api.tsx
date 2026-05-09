import { baseAPI } from "@services/base-api";
import { DEPARTMENT_API } from "@services/tags";

export const DepartmentsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentsList: builder.query({
      query: (payload) => {
        return {
          url: "departments",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [DEPARTMENT_API],
    }),
    postDepartment: builder.mutation<null, any>({
      query: (payload) => ({
        url: `departments`,
        method: "POST",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: [DEPARTMENT_API],
    }),
    putDepartment: builder.mutation<null, any>({
      query: (payload) => ({
        url: `departments/${payload.id}`,
        method: "PUT",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: [DEPARTMENT_API],
    }),
    deleteDepartment: builder.mutation<null, any>({
      query: (payload) => ({
        url: `departments/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [DEPARTMENT_API], 
    }),
  }), 
});

export const {
  useGetDepartmentsListQuery, 
  usePostDepartmentMutation,
  usePutDepartmentMutation,
  useDeleteDepartmentMutation,
} = DepartmentsApi;

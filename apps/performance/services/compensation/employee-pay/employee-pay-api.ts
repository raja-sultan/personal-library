import { baseAPI } from "@services/base-api";

export const employeePayApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeePayData: builder.query({
      query: (params) => ({
        url: `/employee-pay`,
        method: "GET",
        params,
      }),
      providesTags: ["EMPLOYEE_PAY"],
    }),
    getLookupData: builder.query({
      query: ({ type }) => ({
        url: `/reference-data/lookup?type=${type}`,
        method: "GET",
      }),
    }),
    uploadEmployeePay: builder.mutation({
      query: (payload) => ({
        url: "employee-pay/import",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["EMPLOYEE_PAY"],
    }),
    deleteEmployeePay: builder.mutation({
      query: (id: string | null) => ({
        url: `employee-pay/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EMPLOYEE_PAY"],
    }),
    updateEmployeePay: builder.mutation({
      query: ({ id, payload }) => ({
        url: `employee-pay/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["EMPLOYEE_PAY"],
    }),
  }),
});

export const {
  useUploadEmployeePayMutation,
  useGetEmployeePayDataQuery,
  useDeleteEmployeePayMutation,
  useUpdateEmployeePayMutation,
  useGetLookupDataQuery,
} = employeePayApi;

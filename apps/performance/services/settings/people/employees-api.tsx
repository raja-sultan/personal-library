import { baseAPI } from "@services/base-api";
import { EMPLOYEES } from "@services/tags";

export const employeesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    employeesList: builder.query({
      query: ({ ...queryParams }) => ({
        url: `/employees`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: [EMPLOYEES],
    }),
    resendInvite: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}/resend-invitation`,
        method: "PUT",
      }),
      invalidatesTags: [EMPLOYEES],
    }),
    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "/employees",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }),
      invalidatesTags: [EMPLOYEES],
    }),
    getEmployeeDetails: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: ["EMPLOYEE_DETAILS"],
    }),
    updateEmployeeDetails: builder.mutation({
      query: ({ id, payload }) => {
        const keysToRemove = ["gender", "ethnicity", "maritalStatus", "timeZone", "employmentStatus", "jobLevel", "managerId", "department", "location"];
        // Create a new object with filtered properties
        const filteredPayload: Record<string, any> = Object.fromEntries(
          Object.entries(payload).filter(([key, value]) => {
            return (value !== null && value !== "" && value !== undefined) || !keysToRemove.includes(key);
          })
        );
        // Modify the 'pronouns' property as needed
        if (payload?.pronouns) {
          const pronouns = payload?.pronouns?.map((pronoun: any) => pronoun?.id);
          filteredPayload.pronouns = pronouns;
        }
        return {
          url: `/employees/${id}`,
          method: "PATCH",
          body: filteredPayload,
        };
      },
      invalidatesTags: ["EMPLOYEES", "EMPLOYEE_DETAILS"],
    }),

    activateDeactivateEmployee: builder.mutation({
      query: ({ id, status }) => ({
        url: `/employees/${id}/activate-deactivate?isActive=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: [EMPLOYEES],
    }),
    resetEmployeePassword: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}/reset-password`,
        method: "PUT",
      }),
      invalidatesTags: [EMPLOYEES],
    }),
    loginAsUser: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}/login-as?activate-session=true`,
        method: "PUT",
      }),
    }),
    loginAsUserFalse: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}/login-as?activate-session=false`,
        method: "PUT",
      }),
      invalidatesTags: [EMPLOYEES],
    }),
  }),
});

export const {
  useLoginAsUserFalseMutation,
  useLoginAsUserMutation,
  useResetEmployeePasswordMutation,
  useActivateDeactivateEmployeeMutation,
  useGetEmployeeDetailsQuery,
  useEmployeesListQuery,
  useResendInviteMutation,
  useAddEmployeeMutation,
  useUpdateEmployeeDetailsMutation,
} = employeesAPI;

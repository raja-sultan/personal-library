import { baseAPI } from "@services/base-api";
import { COMPENSATION_CYCLE, COMPENSATED_EMPLOYEE } from "@services/tags";

export const compensationCycleApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompensatedEmployeesById: builder.query({
      query: ({ id, params }) => ({
        url: `compensated-employees/${id}`,
        method: "GET",
        params,
      }),
      providesTags: [COMPENSATION_CYCLE, COMPENSATED_EMPLOYEE],
    }),
    patchConfirmApprove: builder.mutation({
      query: ({ compensationCycleId, body }) => ({
        url: `compensated-employees/${compensationCycleId}/confirm-approvals`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [COMPENSATION_CYCLE, COMPENSATED_EMPLOYEE],
    }),
  }),
});

export const {
  useGetCompensatedEmployeesByIdQuery,
  usePatchConfirmApproveMutation,
} = compensationCycleApi;

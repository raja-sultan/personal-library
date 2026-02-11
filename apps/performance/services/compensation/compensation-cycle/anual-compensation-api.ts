import { baseAPI } from "@services/base-api";
import { COMPENSATED_EMPLOYEES } from "@services/tags";


export const annualCompensationCycleApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompensatedEmployee: builder.query({
      query: ({ id }) => ({
        url: `compensated-employees/${id}`,
        method: "GET",
      }),
      providesTags: [COMPENSATED_EMPLOYEES],
    }),
    addNote: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `compensated-employees/note/${id}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [COMPENSATED_EMPLOYEES]
    }),
    confirmRecommendation: builder.mutation({
      query: ({ id, body }) => ({
        url: `compensated-employees/${id}/confirm-recommendations`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [COMPENSATED_EMPLOYEES]
    }),
  }),
});

export const {
  useGetCompensatedEmployeeQuery,
  useAddNoteMutation,
  useConfirmRecommendationMutation
} = annualCompensationCycleApi;
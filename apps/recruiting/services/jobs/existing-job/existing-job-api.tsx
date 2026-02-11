import { baseAPI } from "@services/base-api";
import { EXISTING_JOB } from "@services/tags";

const ExistingJob = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getExistingJob: builder.query({
      query: ({ params }) => ({
        url: "/jobs/existing-jobs-list",
        method: "GET",
        // body: payload.body,
        params,
      }),
      providesTags: [EXISTING_JOB],
    }),
    getDepartments: builder.query({
      query: () => ({
        url: "organization/dropdown-department-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});
export const { useGetExistingJobQuery, useGetDepartmentsQuery,useLazyGetDepartmentsQuery } = ExistingJob;

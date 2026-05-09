import { baseAPI } from "@services/base-api";

export const ChoreographedEmailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLazyGetDepartmentsQuery } = ChoreographedEmailApi;

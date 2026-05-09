import { baseAPI } from "@services/base-api";
import { USERS } from "@services/tags";

export const emailsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postJobCandidateData: builder.mutation({
      query: ({ body }) => ({
        url: `candidates/add-job-candidate`,
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
    postProspectData: builder.mutation({
      query: ({ body }) => ({
        url: `candidates/add-as-prospect`,
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
    getDepartmentList: builder.query({
      query: () => ({
        url: "organization/dropdown-department-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getOfficeList: builder.query({
      query: () => ({
        url: "organization/dropdown-office-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getJobList: builder.query({
      query: ({ params }: any) => ({
        url: "jobs/dropdown-jobs-list",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getPoolList: builder.query({
      query: ({ params }: any) => ({
        url: "crm/dropdown-pool-stages-list",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getCompanyLocationsList: builder.query({
      query: ({ params }: any) => ({
        url: "company-locations",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  usePostJobCandidateDataMutation,
  usePostProspectDataMutation,
  useLazyGetDepartmentListQuery,
  useLazyGetOfficeListQuery,
  useLazyGetJobListQuery,
  useLazyGetPoolListQuery,
  useLazyGetCompanyLocationsListQuery,
} = emailsApi;

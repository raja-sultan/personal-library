import { baseAPI } from "@services/base-api";
import { ADD_AS_PROSPECT_TO } from "@services/tags";

export const addProspectApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postProspect: builder.mutation({
      query: (payload) => ({
        url: "candidates/add-as-prospect",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [ADD_AS_PROSPECT_TO],
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
    getOffice: builder.query({
      query: () => ({
        url: "organization/dropdown-office-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    poolList: builder.query({
      query: ({ params }: any) => ({
        url: "crm/dropdown-get-all-prospect-pool",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    prospectStageList: builder.query({
      query: ({ params }: any) => ({
        url: "crm/dropdown-pool-stages-list",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getProspectOwners: builder.query({
      query: ({ params }: any) => ({
        url: "super-admin/system-admin/dropdown-get-all-users",
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
  usePostProspectMutation,
  useLazyGetDepartmentsQuery,
  useLazyGetOfficeQuery,
  useGetOfficeQuery,
  useGetDepartmentsQuery,
  useLazyPoolListQuery,
  useLazyProspectStageListQuery,
  useLazyGetProspectOwnersQuery,
} = addProspectApi;

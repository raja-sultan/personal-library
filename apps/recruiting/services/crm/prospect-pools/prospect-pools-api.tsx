import { baseAPI } from "@services/base-api";

const TAG = "prospect-pools";
export const ProspectPoolsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCRMProspectPools: builder.query({
      query: (params) => ({
        url: "/crm/list-prospect-pools-with-stages-detail",
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    getCRMDepartmentList: builder.query({
      query: (params) => ({
        url: "/jobs/dropdown-department-list",
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    getCRMOfficeList: builder.query({
      query: (params) => ({
        url: "/organization/dropdown-office-list",
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    
  }),
});
export const { useGetCRMProspectPoolsQuery,useGetCRMDepartmentListQuery,useGetCRMOfficeListQuery } = ProspectPoolsApi;


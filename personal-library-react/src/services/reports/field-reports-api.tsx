import { baseAPI } from "@services/base-api";
import { FIELD_REPORTS } from "@services/tags";

export const FieldReportsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReportList: builder.query({
      query: (params) => {
        return {
          url: "Reports/reports/list",
          method: "GET",
          params,
        };
      },
      providesTags: [FIELD_REPORTS],
    }),
    postFieldReports: builder.mutation<null, any>({
      query: ({ body, companyId }) => ({
        url: `/Reports/reports/getColumnData/${companyId}?limit=10&offset=0`,
        method: "POST",
        body,
      }),
      invalidatesTags: [FIELD_REPORTS],
    }),
    saveFieldReports: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: `/Reports/reports/save-field-report`,
        method: "POST",
        body,
      }),
      invalidatesTags: [FIELD_REPORTS],
    }),
    deleteReportList: builder.mutation<null, any>({
      query: (reportId) => ({
        url: `/Reports/delete-report/${reportId}`,
        method: "DELETE",
      }),
      invalidatesTags: [FIELD_REPORTS],
    }),
    putReportList: builder.mutation<null, any>({
      query: (payload) => ({
        url: `/Reports/rename/${payload?.id}`,
        method: "PUT",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: [FIELD_REPORTS],
    }),
    emailCsvReports: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: `/Reports/reports-csv`,
        method: "POST",
        body,
      }),
      invalidatesTags: [FIELD_REPORTS],
    }),
  }),
});

export const {
  useGetReportListQuery,
  usePostFieldReportsMutation,
  useSaveFieldReportsMutation,
  useDeleteReportListMutation,
  usePutReportListMutation,
  useEmailCsvReportsMutation,
} = FieldReportsApi;

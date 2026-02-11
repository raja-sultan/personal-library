import { baseAPI } from "@services/base-api";
import { EFFICIENCY_REPORTS } from "@services/tags";

const EfficiencyReports = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEfficiencyReport: builder.query<null, any>({
      query: (payload) => {
        return {
          url: `reports/getEfficiencyReports`,
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [EFFICIENCY_REPORTS],
    }),
    addEfficiencyReport: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: "reports/add-efficiency-report",
        method: "POST",
        body,
      }),
      invalidatesTags: [EFFICIENCY_REPORTS],
    }),
  }),
});
export const { useGetEfficiencyReportQuery, useAddEfficiencyReportMutation } =
  EfficiencyReports;

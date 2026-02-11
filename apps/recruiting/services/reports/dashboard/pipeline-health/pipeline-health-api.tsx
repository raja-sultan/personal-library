import { baseAPI } from "@services/base-api";
import { PIPELINE_REPORTS } from "@services/tags";

const PipelineHealth = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPipeLineReport: builder.query<null, any>({
      query: (payload) => {
        return {
          url: `reports/getreports`,
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [PIPELINE_REPORTS],
    }),
    addPipelineReport: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: "reports/add-pipeline-report",
        method: "POST",
        body,
      }),
      invalidatesTags: [PIPELINE_REPORTS],
    }),
  }),
});
export const { useGetPipeLineReportQuery, useAddPipelineReportMutation } =
  PipelineHealth;

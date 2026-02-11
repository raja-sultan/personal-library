import { baseAPI } from "@services/base-api";
import { PIPELINE_REPORTS } from "@services/tags";

const offersHiringApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getHiringReports: builder.query<null, any>({
      query: (payload) => {
        return {
          url: `reports/getOffersReports`,
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [PIPELINE_REPORTS],
    }),
    addHealthAndHiring: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: "reports/add-offers-report",
        method: "POST",
        body,
      }),
      invalidatesTags: [PIPELINE_REPORTS],
    }),
  }),
});
export const { useGetHiringReportsQuery, useAddHealthAndHiringMutation } =
  offersHiringApi;

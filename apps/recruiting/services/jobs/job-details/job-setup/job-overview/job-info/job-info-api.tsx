import { baseAPI } from "@services/base-api";
import { JOB_OVERVIEW } from "@services/tags";

export const jobOverviewApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobInfoDataApi: builder.query({
      query: ({ jobId }: any) => `jobs/overview/get-job-info/${jobId}`,
      providesTags: [JOB_OVERVIEW],
    }),
    putJobInfo: builder.mutation<null, any>({
      query: (body: any) => ({
        url: `jobs/overview/update-job-info`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [JOB_OVERVIEW],
    }),
  }),
});

export const { useGetJobInfoDataApiQuery, usePutJobInfoMutation } =
  jobOverviewApi;

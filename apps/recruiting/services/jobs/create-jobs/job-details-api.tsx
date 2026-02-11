import { baseAPI } from "@services/base-api";
import { JOB_DETAILS } from "@services/tags";

export const JobDetailsAPi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetailsAPi: builder.query({
      query: ({ jobId }: any) => ({
        url: `jobs/details/${jobId}`,
      }),
      providesTags: [JOB_DETAILS],
    }),
    getJobNotification: builder.query<null, any>({
      query: ({ jobId }) => ({
        url: `/jobs/overview-notification/${jobId}`,
      }),
      providesTags: [JOB_DETAILS],
    }),
  }),
});

export const { useGetJobDetailsAPiQuery, useGetJobNotificationQuery } =
  JobDetailsAPi;

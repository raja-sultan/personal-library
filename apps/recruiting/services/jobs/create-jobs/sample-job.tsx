import { baseAPI } from "@services/base-api";
import { SAMPLE_JOB } from "@services/tags";

export const sampleJobAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Sample Job Get Api
    getSampleJob: builder.query({
      query: () => ({
        url: "jobs/get-sample-job",
        method: "GET",
      }),
      providesTags: [SAMPLE_JOB],
    }),
  }),
});

export const { useGetSampleJobQuery } = sampleJobAPI;

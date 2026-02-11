import { baseAPI } from "@services/base-api";
import { JOB_SETUP_SCORE_CARD } from "@services/tags";

export const jobSetUpCardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStagesAndInterviews: builder.query({
      query: ({ jobId }) => ({
        url: `jobs/get-focus-attributes-per-interview/${jobId}`,
        method: "GET",
      }),
      providesTags: [JOB_SETUP_SCORE_CARD],
    }),
  }),
});

export const {
  useGetStagesAndInterviewsQuery,
  useLazyGetStagesAndInterviewsQuery,
} = jobSetUpCardApi;

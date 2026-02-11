import { baseAPI } from "@services/base-api";
import { VIEW_JOB_MAIN } from "@services/tags";
const Tag = [VIEW_JOB_MAIN];

const activityFeedApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobsActivityFeed: builder.query({
      query: (payload) => ({
        url: `/jobs/get-job-activity-feed/${payload.params.jobId}`,
        method: "GET",
      }),
      providesTags: Tag,
    }),
  }),
});
export const { useGetJobsActivityFeedQuery } = activityFeedApi;

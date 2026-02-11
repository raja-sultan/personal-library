import { baseAPI } from "@services/base-api";

const ApplicationReviewApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationReviews: builder.query({
      query: () => ({
        url: "dashboard/application-reviews",
        method: "GET",
      }),
    }),
    getJobsStageDetails: builder.query({
      query: (params) => ({
        url: "/jobs/job-stage-detail",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetJobsStageDetailsQuery, useGetApplicationReviewsQuery } =
  ApplicationReviewApi;

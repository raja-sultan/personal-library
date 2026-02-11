import { baseAPI } from "@services/base-api";
import { FEEDBACK_DETAILS } from "@services/tags";

const TAG = "pipeline";
export const feedBackApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackDetails: builder.query({
      query: (payload) => ({
        url: `jobs/get-all-feedback/${payload.jobId}/${payload.canidateId}`,
        method: "GET",
      }),
      providesTags: [FEEDBACK_DETAILS, TAG],
    }),
  }),
});

export const { useGetFeedbackDetailsQuery } = feedBackApi;

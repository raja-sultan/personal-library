import { baseAPI } from "@services/base-api";
import { GET_JOB_CANDIDATES } from "@services/tags";

export const FollowUpReminder = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addFollowUpReminder: builder.mutation({
      query: ({ payload, candidateId }: any) => ({
        url: `candidates/followup-reminder/${candidateId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [GET_JOB_CANDIDATES],
    }),
  }),
});

export const { useAddFollowUpReminderMutation } = FollowUpReminder;

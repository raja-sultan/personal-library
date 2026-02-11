import { baseAPI } from "@services/base-api";
import { INTERVIEW_PLAN, SCORE_CARD_DETAILS } from "@services/tags";

export const interviewStageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    assignInterview: builder.mutation({
      query: ({ jobId, body }: any) => ({
        url: `candidates/assign-interview-scorecard/${jobId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),
    sendForm: builder.mutation({
      query: ({ jobId, body }: any) => ({
        url: `candidates/send-form/${jobId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),
    requestAvailability: builder.mutation({
      query: ({ interviewId, body }: any) => ({
        url: `candidates/interview/request-availability/${interviewId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),
    sendCalendarInvite: builder.mutation({
      query: ({ body }: any) => ({
        url: `candidates/interview/send-calender-invite`,
        method: "POST",
        body,
      }),
    }),
    getScoreCardDetails: builder.query({
      query: ({ jobId, stageId, interviewId, candidateId }: any) => ({
        url: `jobs/scorecard/get-details/${candidateId}/${jobId}/${interviewId}/${stageId}`,
        method: "GET",
      }),
      providesTags: [SCORE_CARD_DETAILS],
    }),
    updateSubmitNewCard: builder.mutation({
      query: ({ finalPayload: { scorecardId, body } }: any) => ({
        url: `candidates/submit-new-scorecard/${scorecardId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [SCORE_CARD_DETAILS],
    }),
  }),
});

export const {
  useAssignInterviewMutation,
  useSendFormMutation,
  useRequestAvailabilityMutation,
  useSendCalendarInviteMutation,
  useGetScoreCardDetailsQuery,
  useUpdateSubmitNewCardMutation,
} = interviewStageApi;

import { baseAPI } from "@services/base-api";
import { INTERVIEW_PLAN } from "@services/tags";

export const interviewPlan = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetails: builder.query<null, any>({
      query: ({ jobId }) => ({
        url: `jobs/interview-plan/get-job-interview-plan/${jobId}`,
      }),
      providesTags: [INTERVIEW_PLAN],
    }),

    getInterviewDetails: builder.query<null, any>({
      query: ( payload ) => ({
        url: `jobs/interview/${payload.interviewId}/detail`,
      }),
      providesTags: [INTERVIEW_PLAN],
    }),
    getInterviewPlansData: builder.query<null, any>({
      query: ({ jobId, candidateID }) => ({
        url: `jobs/interview-plan/get-job-interview-plan/${jobId}/${candidateID}`,
      }),
      providesTags: [INTERVIEW_PLAN],
    }),
    getScoreCardAttributes: builder.query<null, any>({
      query: (jobId) => `jobs/details/${jobId}?stepName=scorecard`,
      providesTags: [INTERVIEW_PLAN],
    }),
    getInterviewPlanStages: builder.query<null, any>({
      query: (jobId) =>
        `/jobs/interview-plan/get-interview-plan-stages/${jobId}`,
      providesTags: [INTERVIEW_PLAN],
    }),

    getAlertSettingData: builder.query<null, any>({
      query: ({ jobId }) => ({
        url: `jobs/alert-setting/${jobId}`,
      }),
      providesTags: [INTERVIEW_PLAN],
    }),

    addAlertDays: builder.mutation<null, any>({
      query: ({ payload, jobId }) => ({
        url: `jobs/alert-setting/jobId?jobId=${jobId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    updateAlertDays: builder.mutation<null, any>({
      query: ({ stageId, payload }) => ({
        url: `jobs/alert-setting/${stageId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    addStage: builder.mutation<null, any>({
      query: (payload) => ({
        url: `jobs/interview-plan/create-stage/${payload.params.jobid}`,
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    updateStage: builder.mutation<null, any>({
      query: ({ stageId, jobId, payload }) => ({
        url: `jobs/interview-plan/update-stage/${stageId}/${jobId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    deleteStage: builder.mutation<null, any>({
      query: ({ stageId, jobId }) => ({
        url: `jobs/interview-plan/delete-stage/${stageId}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    postInterviewPlan: builder.mutation<null, any>({
      query: ({ stageId, jobId, body }) => ({
        url: `jobs/interview-plan/add-interview/${jobId}/${stageId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    updateInterviewPlan: builder.mutation<null, any>({
      query: ({ interviewId, body }) => ({
        url: `jobs/interview-plan/update-interview/${interviewId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),

    deleteInterview: builder.mutation<null, any>({
      query: ({ interviewId, jobId }) => ({
        url: `jobs/interview-plan/sub-interview/${interviewId}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: [INTERVIEW_PLAN],
    }),
  }),
});

export const {
  useAddStageMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
  useGetInterviewPlansDataQuery,
  useGetJobDetailsQuery,
  useGetScoreCardAttributesQuery,
  useGetAlertSettingDataQuery,
  useAddAlertDaysMutation,
  useUpdateAlertDaysMutation,
  usePostInterviewPlanMutation,
  useUpdateInterviewPlanMutation,
  useDeleteInterviewMutation,
  useGetInterviewPlanStagesQuery,
  useGetInterviewDetailsQuery,
} = interviewPlan;

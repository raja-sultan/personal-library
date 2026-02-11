import { baseAPI } from "@services/base-api";
import { NOTIFICATIONS, NOTIFICATIONS_BY_USER } from "@services/tags";

export const NotificationsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverallJob: builder.query({
      query: ({ jobId, stepName }) => ({
        url: `jobs/details/${jobId}?stepName=${stepName}`,
        method: "GET",
      }),
      providesTags: [NOTIFICATIONS],
    }),
    getNotificationCount: builder.query({
      query: ({ jobId }) => ({
        url: `jobs/job-notification-count/${jobId}`,
        method: "GET",
      }),
      providesTags: [NOTIFICATIONS],
    }),
    updateCandidateNotifications: builder.mutation<null, any>({
      query: ({ body, jobId }) => ({
        url: `jobs/notification/configure/${jobId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS],
    }),
    updateScorecardReminderNotifications: builder.mutation<null, any>({
      query: ({ body, jobId }) => ({
        url: `jobs/notification/scorecard-reminders/${jobId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS],
    }),
    updateNewScorecardNotifications: builder.mutation<null, any>({
      query: ({ body, jobId }) => ({
        url: `jobs/notification/new-scorecard/${jobId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS],
    }),
    updateStageTransitionNotifications: builder.mutation<null, any>({
      query: ({ body, jobId, stageId }) => ({
        url: `jobs/notification/stage-transition/${jobId}/${stageId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS],
    }),
    getJobStagesList: builder.query({
      query: ({ params }) => ({
        url: `jobs/interview-plan/get-interview-plan-stages/${params?.jobId}`,
      }),
      transformResponse: (response: any) => {
        return typeof response?.data === "object" ? response?.data : [];
      },
    }),
    getNotificationByUsersDataApi: builder.query({
      query: (params) => {
        return {
          url: `jobs/notification/user-list`,
          method: "GET",
          params,
        };
      },
      providesTags: [NOTIFICATIONS_BY_USER],
    }),
    getNotificationsByUserId: builder.query({
      query: ({ userId }) => ({
        url: `jobs/notification/user/${userId}`,
        method: "GET",
      }),
      providesTags: [NOTIFICATIONS_BY_USER],
    }),
    updateNotificationsByUserId: builder.mutation<null, any>({
      query: ({ body, userId }) => ({
        url: `jobs/notification/user/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS_BY_USER],
    }),
    getStageAlertByUserId: builder.query({
      query: ({ userId }) => ({
        url: `jobs/candidate-notification/${userId}`,
        method: "GET",
      }),
      providesTags: [NOTIFICATIONS_BY_USER],
    }),
    updateStageAlertByUserId: builder.mutation<null, any>({
      query: ({ body, userId }) => ({
        url: `jobs/candidate-notification/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [NOTIFICATIONS_BY_USER],
    }),
  }),
});

export const {
  useGetOverallJobQuery,
  useGetNotificationCountQuery,
  useUpdateCandidateNotificationsMutation,
  useUpdateScorecardReminderNotificationsMutation,
  useUpdateNewScorecardNotificationsMutation,
  useUpdateStageTransitionNotificationsMutation,
  useLazyGetJobStagesListQuery,
  useGetNotificationByUsersDataApiQuery,
  useGetNotificationsByUserIdQuery,
  useUpdateNotificationsByUserIdMutation,
  useGetStageAlertByUserIdQuery,
  useUpdateStageAlertByUserIdMutation,
} = NotificationsApi;

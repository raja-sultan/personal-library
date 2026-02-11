import { baseAPI } from "@services/base-api";
import { SCHEDULE_INTERVIEW } from "@services/tags";

export const scheduleInterviewApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postScheduleInterview: builder.mutation({
      query: ({ jobId, body }: any) => ({
        url: `candidates/schedule-interview/${jobId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SCHEDULE_INTERVIEW],
    }),
    getAllUsers: builder.query({
      query: (params: any) => ({
        url: `super-admin/system-admin/dropdown-get-all-users`,
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: [SCHEDULE_INTERVIEW],
    }),
    getScheduleInterview: builder.query({
      query: ({ jobId, candidateId, stageId, interviewId }) =>
        `candidates/scheduled-interview/${candidateId}/${jobId}/${stageId}/${interviewId}`,
      providesTags: [SCHEDULE_INTERVIEW],
    }),
  }),
});

export const {
  usePostScheduleInterviewMutation,
  useGetAllUsersQuery,
  useGetScheduleInterviewQuery,
} = scheduleInterviewApi;

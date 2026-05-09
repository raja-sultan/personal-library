import { baseAPI } from "./base-api";

export const calendarApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarReminders: builder.query({
      query: (params) => ({
        url: `super-admin/calender-get-reminder`,
        method: "GET",
        params,
      }),
      providesTags: ["calendar"],
    }),
    postReminder: builder.mutation({
      query: (body) => ({
        url: "super-admin/calender-add-reminder",
        method: "POST",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),
  }),
});

export const { useGetCalendarRemindersQuery, usePostReminderMutation } =
  calendarApi;

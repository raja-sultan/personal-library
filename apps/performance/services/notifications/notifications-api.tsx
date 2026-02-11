import { baseAPI } from "@services/base-api";
import { NOTIFICATION } from "@services/tags";

export const notificationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ ...params }) => ({
        url: `/notifications`,
        method: "GET",
        params
      }),
      providesTags: [NOTIFICATION],
    }),
  }),
});

export const { useGetNotificationQuery } = notificationApi;

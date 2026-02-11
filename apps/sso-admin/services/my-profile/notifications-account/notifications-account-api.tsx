import { baseAPI } from "@services/base-api";
import { NOTIFICATIONS_ACCOUNT } from "@services/tags";

const NotificationsAccount = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsAccount: builder.query({
      query: ({ params }) => ({
        url: "/notifications",
        method: "GET",
        // body: payload.body,
        params,
      }),
      providesTags: [NOTIFICATIONS_ACCOUNT],
    }),
    getNotificationsLatest: builder.query({
      query: () => ({
        url: "/notifications/latest",
        method: "GET",
      }),
      providesTags: [NOTIFICATIONS_ACCOUNT],
    }),
  }),
});
export const { useGetNotificationsAccountQuery, useGetNotificationsLatestQuery } = NotificationsAccount;

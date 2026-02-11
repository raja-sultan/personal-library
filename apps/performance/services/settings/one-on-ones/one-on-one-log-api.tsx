import { baseAPI } from "@services/base-api";
import { ONE_ON_ONES, ONE_ON_ONES_LOGS } from "@services/tags";

export const oneOnOneLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOneOnOneLogs: builder.query({
      query: ({ ...params }) => ({
        url: `one-on-one-logs`,
        method: "GET",
        params
      }),
      providesTags: [ONE_ON_ONES_LOGS],
    }),

    getOneOnOneLogIdHistory: builder.query({
      query: ({  ...params }) => ({
        url: `one-on-one/history`,
        method: "GET",
        params,
      }),
      providesTags: [ONE_ON_ONES_LOGS, ONE_ON_ONES],
    }),
  }),
});

export const {
  useGetOneOnOneLogsQuery,
  useGetOneOnOneLogIdHistoryQuery
} = oneOnOneLogAPI;

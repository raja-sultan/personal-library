import { baseAPI } from "@services/base-api";
import { UPDATES_LOG } from "@services/tags";

export const updatesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updatesList: builder.query({
      query: (params) => {
        return {
          url: `/update-logs`,
          method: "GET",
          params: { ...params },
        };
      },
      providesTags: [UPDATES_LOG],
    }),
    addUpdatesLog: builder.mutation({
      query: () => ({
        url: "update-logs",
        method: "POST",
      }),
      invalidatesTags: [UPDATES_LOG],
    }),
    getUpdateById: builder.query({
      query: ({ id }) => {
        return {
          url: `/updates/${id}`,
          method: "GET",
        };
      },
      providesTags: [UPDATES_LOG],
    }),
    individualStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: userId
          ? `update-logs/turn-on?userId=${userId}&status=${status}`
          : `update-logs/turn-on?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: [UPDATES_LOG],
    }),
  }),
});

export const {
  useUpdatesListQuery,
  useAddUpdatesLogMutation,
  useGetUpdateByIdQuery,
  useIndividualStatusMutation,
} = updatesAPI;

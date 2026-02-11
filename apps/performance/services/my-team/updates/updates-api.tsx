import { baseAPI } from "@services/base-api";
import { UPDATES } from "@services/tags";

export const UpdatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMyTeamUpdates: builder.query({
      query: ({ ...params }) => ({
        url: "/my-team/updates",
        method: "GET",
        params,
      }),
      providesTags: [UPDATES],
    }),

    markUpdate: builder.mutation({
      query: ({ id }) => {
        return {
          url: `updates/${id}/mark-as-reviewed`,
          method: "PATCH",
        };
      },
      invalidatesTags: [UPDATES],
    }),

    postMyTeamUpdatesSetting: builder.mutation({
      query: ({ body }) => ({
        url: `/settings/custom-updates-setting`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [UPDATES],
    }),
  }),
});

export const { useGetMyTeamUpdatesQuery, useMarkUpdateMutation , usePostMyTeamUpdatesSettingMutation } = UpdatesApi;

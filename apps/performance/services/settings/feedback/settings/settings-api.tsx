import { baseAPI } from "@services/base-api";
import { FEEDBACKSETTINGS } from "@services/tags";

export const feedbackSettingApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updatePermitttedFeedbackTypes: builder.mutation({
      query: (data) => ({
        url: `/settings/permitted-feedback-types`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [FEEDBACKSETTINGS],
    }),

    getPublicPraiseWall: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/feedbacks/public?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: [FEEDBACKSETTINGS],
    }),

    updatePublicPraiseWall: builder.mutation({
      query: (data) => ({
        url: `/settings/public-praise-wall`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [FEEDBACKSETTINGS],
    }),
  }),
});

export const {
  useUpdatePermitttedFeedbackTypesMutation,
  useUpdatePublicPraiseWallMutation,
  useGetPublicPraiseWallQuery,
} = feedbackSettingApi;

import { baseAPI } from "@services/base-api";
import { ACTIVITY_FEED } from "@services/tags";

const Tag = [ACTIVITY_FEED];

const ActivityFeedApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivityFeedList: builder.query({
      query: (payload) => ({
        url: `/candidates/get-candidate-activity-feed/${payload.params.candidateId}`,
        method: "GET",
        // body: payload.body,
        // params: payload.params,
      }),
      providesTags: Tag,
    }),
  }),
});
export const { useGetAllActivityFeedListQuery } = ActivityFeedApi;

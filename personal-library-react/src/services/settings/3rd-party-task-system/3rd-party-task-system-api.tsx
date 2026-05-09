import { baseAPI } from "@services/base-api";
import { PARTY_TASK } from "@services/tags";

export const partyTaskApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postPartytaskData: builder.mutation({
      query: ({ body }) => ({
        url: `onboarding/create-3rd-party-task-system`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PARTY_TASK],
    }),
    getPartytaskDataApi: builder.query({
      query: () => {
        return { url: "onboarding/get-3rd-party-task-system-list", method: "GET" };
      },
      providesTags: [PARTY_TASK],
    }),
   
  }),
});
export const {
  usePostPartytaskDataMutation,  
  useGetPartytaskDataApiQuery,
} = partyTaskApi;



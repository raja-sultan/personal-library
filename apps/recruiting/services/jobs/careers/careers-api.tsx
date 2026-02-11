import { baseAPI } from "@services/base-api";
import { JOB_OPENINGS } from "@services/tags";

export const careersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get Api
    getJobOpenings: builder.query({
      query: ({ params }) => ({
        url: `jobBoard/apply-now`,
        method: "GET",
        params,
      }),
      providesTags: [JOB_OPENINGS],
    }),
    postApplyNow: builder.mutation({
      query: ({ params, body }: any) => ({
        url: `jobBoard/apply-now/${params?.jobId}/${params?.openingId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [JOB_OPENINGS],
    }),
  }),
});

export const { useGetJobOpeningsQuery, usePostApplyNowMutation } = careersApi;

import { baseAPI } from "@services/base-api";
import { JOB_POST } from "@services/tags";

export const jobPostsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobPostsDataApi: builder.query({
      query: ({ jobId }: any) => `jobs/get-all-jobposts/${jobId}`,
      providesTags: [JOB_POST],
    }),
    putJobPosts: builder.mutation<null, any>({
      query: (body: any) => ({
        url: `jobs/overview/update-job-posts`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [JOB_POST],
    }),
  }),
});

export const { useGetJobPostsDataApiQuery, usePutJobPostsMutation } =
  jobPostsApi;

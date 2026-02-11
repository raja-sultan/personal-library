import { baseAPI } from "@services/base-api";
import { JOB_POST } from "@services/tags";

export const jobPostApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobPostDataApi: builder.query({
      query: ({ jobId }: any) => {
        return {
          url: `jobs/get-all-jobposts/${jobId}`,
          method: "GET",
        };
      },
      providesTags: [JOB_POST],
    }),
    getJobPostByIdApi: builder.query({
      query: ({ jobPostId }: any) => {
        return {
          url: `jobs/get-jobpost/${jobPostId}`,
          method: "GET",
        };
      },
      providesTags: [JOB_POST],
    }),
    postJobPost: builder.mutation<null, any>({
      query: ({ body, jobId, openingId }: any) => ({
        url: `jobs/add-jobpost/${jobId}/${openingId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [JOB_POST],
    }),
    putJobPostById: builder.mutation<null, any>({
      query: ({ body, jobPostId }: any) => ({
        url: `jobs/update-jobpost/${jobPostId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [JOB_POST],
    }),
    updateJobPostStatusById: builder.mutation<null, any>({
      query: ({ status, jobPostId }: any) => ({
        url: `jobs/update-jobpost-status/${jobPostId}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: [JOB_POST],
    }),
    getJobOpeningByJobIdApi: builder.query({
      query: ({ jobId }: any) => {
        return {
          url: `jobs/get-job-openings${jobId}`,
          method: "GET",
        };
      },
      providesTags: [JOB_POST],
    }),
    getJobOpeningIdList: builder.query({
      query: ({payload}) => {
        return {
          url: "jobs/get-job-openings",
          method: "GET",
          params: { ...payload },
        };
      },
      providesTags: [JOB_POST],
    }),
  }),
});

export const {
  useGetJobPostDataApiQuery,
  useGetJobPostByIdApiQuery,
  usePostJobPostMutation,
  usePutJobPostByIdMutation,
  useUpdateJobPostStatusByIdMutation,
  useGetJobOpeningByJobIdApiQuery,
  useGetJobOpeningIdListQuery,
  useLazyGetJobOpeningByJobIdApiQuery,
} = jobPostApi;

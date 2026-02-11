import { baseAPI } from "@services/base-api";
import { JOB_BOARDS } from "@services/tags";

export const jobBoardsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobBoards: builder.query({
      query: ({ params }) => {
        return {
          url: `jobBoard`,
          method: "GET",
          params,
        };
      },
      providesTags: [JOB_BOARDS],
    }),
    postJobBoards: builder.mutation({
      query: (payload) => {
        return {
          url: `jobBoard`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [JOB_BOARDS],
    }),
    getJobBoardsById: builder.query({
      query: (payload) => {
        return {
          url: `jobBoard/detail/${payload}`,
          method: "GET",
        };
      },
      providesTags: [JOB_BOARDS],
    }),
    patchJobBoards: builder.mutation({
      query: (payload) => {
        return {
          url: `jobBoard/make-board-live/${payload?.jobBoardId}`,
          method: "PATCH",
          body: payload?.body,
        };
      },
      invalidatesTags: [JOB_BOARDS],
    }),
    putJobBoardUpdate: builder.mutation({
      query: (payload) => {
        return {
          url: `jobBoard/update-job-board/${payload?.jobBoardId}`,
          method: "PUT",
          body: payload?.body,
        };
      },
      invalidatesTags: [JOB_BOARDS],
    }),
    getJobPostsById: builder.query({
      query: (payload) => {
        return {
          url: `jobBoard/job-posts/${payload?.jobBoardId}`,
          method: "GET",
          params: payload?.params,
        };
      },
      providesTags: [JOB_BOARDS],
    }),
    getJobPostsInternal: builder.query({
      query: (payload) => {
        return {
          url: `jobBoard/job-posts/internal/${payload?.companyName}`,
          method: "GET",
          params: payload?.param,
        };
      },
      providesTags: [JOB_BOARDS],
    }),
    getJobPostsDescription: builder.query({
      query: (payload) => {
        return {
          url: `jobs/get-jobpost/${payload?.jobPostId}`,
          method: "GET",
        };
      },
      providesTags: [JOB_BOARDS],
    }),
    patchJobPostUpdate: builder.mutation({
      query: (payload) => {
        return {
          url: `jobs/update-jobpost-status/${payload?.jobPostId}/${payload?.status}`,
          method: "PATCH",
        };
      },
      invalidatesTags: [JOB_BOARDS],
    }),
    getOfficeAndDepartment: builder.query({
      query: (payload) => {
        return {
          url: `jobBoard/list-department-office/${payload.company}/${payload.listType}`,
          method: "GET",
        };
      },
      providesTags: [JOB_BOARDS],
    }),
  }),
});

export const {
  useGetJobBoardsQuery,
  usePostJobBoardsMutation,
  useGetJobBoardsByIdQuery,
  usePatchJobBoardsMutation,
  usePutJobBoardUpdateMutation,
  useGetJobPostsByIdQuery,
  useGetJobPostsInternalQuery,
  useGetJobPostsDescriptionQuery,
  usePatchJobPostUpdateMutation,
  useGetOfficeAndDepartmentQuery,
} = jobBoardsApi;

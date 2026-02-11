import { baseAPI } from "@services/base-api";
import { VIEW_JOB_MAIN } from "@services/tags";

const Tag = [VIEW_JOB_MAIN];

const ViewJobsMain = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (payload) => ({
        url: "/jobs/overall-jobs-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    deleteJobs: builder.mutation({
      query: (payload) => ({
        url: "/jobs/remove-form",
        method: "Delete",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    listFormDropDown: builder.query({
      query: (payload) => ({
        url: "/jobs/list-form-drop-down",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    PutCopyFrom: builder.mutation({
      query: (payload) => ({
        url: "/jobs/copy-form",
        method: "PUT",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    patchCopyFrom: builder.mutation({
      query: (payload) => ({
        url: "/jobs/remove-form",
        method: "PATCH",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    downloadStageByJobsReports: builder.query({
      query: () => ({
        url: "/jobs/download-stage-by-job",
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
    patchJobsFollow: builder.mutation({
      query: (payload) => ({
        url: `/jobs/follow-user/`,
        method: "PATCH",
        params: {
          jobId: payload.params.jobId,
        },
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetAllJobsQuery,
  useDeleteJobsMutation,
  useListFormDropDownQuery,
  usePutCopyFromMutation,
  usePatchCopyFromMutation,
  useLazyDownloadStageByJobsReportsQuery,
  usePatchJobsFollowMutation,
} = ViewJobsMain;

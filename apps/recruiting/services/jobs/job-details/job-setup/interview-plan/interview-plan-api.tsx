import { baseAPI } from "@services/base-api";
import { JOB_DETAILS } from "@services/tags";

export const InterviewPlanApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateMileStones: builder.mutation({
      query: ({ payload, jobId }) => ({
        url: `jobs/update-job-milestone/${jobId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [JOB_DETAILS],
    }),
    getStagesList: builder.query({
      query: ({ params }) => {
        return {
          url: `jobs/interview-plan/get-interview-plan-stages/${params?.jobId}`,
        };
      },
      transformResponse: (response: any) => {
        return typeof response?.data === "object" ? response?.data : [];
      },
    }),
    getFormByStageList: builder.query({
      query: ({ jobId }) => {
        return {
          url: `jobs/get-forms-by-stage?jobId=${jobId}`,
        };
      },
    }),
  }),
});

export const {
  useUpdateMileStonesMutation,
  useLazyGetStagesListQuery,
  useGetFormByStageListQuery,
} = InterviewPlanApi;

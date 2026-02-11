import { baseAPI } from "@services/base-api";
import { CANDIDATE_MAIN } from "@services/tags";

const Tag = [CANDIDATE_MAIN];

const CandidateMain = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCandidate: builder.query({
      query: (payload) => ({
        url: "/candidates/job-candidate-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    getAllJobs: builder.query({
      query: (payload) => ({
        url: "/jobs/overall-jobs-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    filterCrmPoolStageList: builder.query({
      query: (payload) => ({
        url: "/crm/dropdown-pool-stages-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
    }),
    filterCrmDropDownAllProspectPool: builder.query({
      query: (payload) => ({
        url: "/crm/dropdown-pool-stages-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
    }),
    filterJobSubmitDropDown: builder.query({
      query: (payload) => ({
        url: "/candidates/submitted-job-post-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
    }),
    generateReport: builder.query({
      query: () => ({
        url: "/candidates/download-generate-report-candidate",
        method: "GET",
        responseHandler: (response) => response.blob(),
        params: {
          limit: 2000000,
          offset: 0,
        },
      }),
    }),
  }),
});
export const {
  useGetAllCandidateQuery,
  useGetAllJobsQuery,
  useFilterCrmPoolStageListQuery,
  useFilterCrmDropDownAllProspectPoolQuery,
  useFilterJobSubmitDropDownQuery,
  useLazyGenerateReportQuery,
} = CandidateMain;

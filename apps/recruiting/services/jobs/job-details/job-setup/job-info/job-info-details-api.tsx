import { baseAPI } from "@services/base-api";
import {
  ADD_JOB_INFO,
  JOB_OPENING_INFO_IN_JOB_DETAILS,
  SINGLE_JOB_OPENING_INFO,
} from "@services/tags";

// please chnage the url and add the base url and update tags too
export const jobInfoDetailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateJobInfoTemplateStatus: builder.mutation<null, any>({
      query: ({ payload, jobId }) => ({
        url: `jobs/tamplate-job/${jobId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [ADD_JOB_INFO],
    }),
    getViewReportTable: builder.query({
      query: ({ jobId, params }) => ({
        url: `jobs/details/${jobId}`,
        params: { ...params },
      }),
      providesTags: [ADD_JOB_INFO],
    }),
    getDropDownCloseReasonsList: builder.query({
      query: () => ({
        url: "/configuration/close-reason/list",
        method: "GET",
        params: {
          limit: 100000,
          offset: 0,
        },
      }),
    }),
    getJobOpeningsIds: builder.query({
      query: (payload) => {
        return {
          url: `jobs/get-job-openings`,
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [JOB_OPENING_INFO_IN_JOB_DETAILS],
    }),
    getSingleOpeningInfo: builder.query({
      query: ({ openingId }) => `/jobs/get-job-opening?openingId=${openingId}`,
      providesTags: [JOB_OPENING_INFO_IN_JOB_DETAILS, SINGLE_JOB_OPENING_INFO],
    }),
    updateJobOpeningInfo: builder.mutation<null, any>({
      query: (payload) => ({
        url: `jobs/update-job-opening/${payload.params.openingId}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: [ADD_JOB_INFO, SINGLE_JOB_OPENING_INFO],
    }),
    addNewJobOpening: builder.mutation<null, any>({
      query: ({ payload, jobId }) => ({
        url: `jobs/create-job-opening/${jobId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [JOB_OPENING_INFO_IN_JOB_DETAILS, ADD_JOB_INFO],
    }),
  }),
});

export const {
  useUpdateJobInfoTemplateStatusMutation,
  useGetViewReportTableQuery,
  useGetJobOpeningsIdsQuery,
  useLazyGetJobOpeningsIdsQuery,
  useLazyGetSingleOpeningInfoQuery,
  useUpdateJobOpeningInfoMutation,
  useAddNewJobOpeningMutation,
  useLazyGetDropDownCloseReasonsListQuery,
  useGetDropDownCloseReasonsListQuery,
} = jobInfoDetailApi;

import { baseAPI } from "@services/base-api";
import { CANDIDATE_MAIN } from "@services/tags";

const Tag = [CANDIDATE_MAIN];

const CandidateMain = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomReport: builder.query({
      query: (payload) => ({
        url: "candidates/generate-report-candidate-list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    getDownloadCustomReport: builder.query({
      query: ({ offset, limit }) => ({
        url: `candidates/download-generate-report-candidate?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: Tag,
    }),
    generateSendEmail: builder.mutation({
      query: ({ body }) => ({
        url: `candidates/send-email-generate-report`,
        method: "POST",
        body,
      }),
      // providesTags: Tag,
    }),
  }),
});
export const { useGetAllCustomReportQuery, useGenerateSendEmailMutation, useGetDownloadCustomReportQuery, useLazyGetDownloadCustomReportQuery } =
  CandidateMain;

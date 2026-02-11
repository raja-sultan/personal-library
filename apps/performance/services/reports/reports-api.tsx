
import { baseAPI } from "../base-api";
import { REPORTS } from "@services/tags";

export const reportsApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        compensationsList: builder.query({
            query: ({ ...params }) => ({
                url: "reports/compensations",
                method: "GET",
                params
            }),
            providesTags: [REPORTS],
        }),
        reviewList: builder.query({
            query: ({ ...params }) => ({
                url: "review-cycles",
                method: "GET",
                params
            }),
            providesTags: [REPORTS],
        }),
        getReportsGoals: builder.query({
            query: ({ ...params }) => ({
                url: "reports/goals",
                method: "GET",
                params
            }),
            providesTags: [REPORTS],
        }),
        getOneOnOneReports: builder.query({
          query: ({...params}) => ({
            url: `reports/one-on-one`,
            method: "GET",
            params,
          }),
          providesTags: [REPORTS],
        }),
        getReportsCareer: builder.query({
            query: ({ ...params }) => ({
                url: "reports/career",
                method: "GET",
                params
            }),
            providesTags: [REPORTS],
        }),
        getFeedbacks: builder.query({
            query: ({ ...params }) => ({
              url: `/reports/feedbacks`,
              method: "GET",
              params
            }),
            providesTags: [REPORTS],
          }),
    }), 
});

export const {
  useCompensationsListQuery,
  useReviewListQuery,
  useGetReportsGoalsQuery,
  useGetOneOnOneReportsQuery,
  useGetReportsCareerQuery,
  useGetFeedbacksQuery,
} = reportsApi;

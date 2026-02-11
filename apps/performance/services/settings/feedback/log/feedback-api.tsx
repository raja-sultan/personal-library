import { baseAPI } from "@services/base-api";
import { FEEDBACKLOGS } from "@services/tags";

export const feedbackApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbackLog: builder.query({
            query: ({ ...params }) => ({
                url: `/feedback-logs`,
                method: 'GET',
                params
            }),
            providesTags: [FEEDBACKLOGS]
        }),
        getPendingFeedbackLog: builder.query({
            query: ({ ...params }) => ({
                url: `/feedback-logs/pending`,
                method: 'GET',
                params
            }),
            providesTags: [FEEDBACKLOGS]
        }),
        getEmployeesFeedbackLog: builder.query({
            query: ({...params }) => ({
                url: `/feedback-logs/employees`,
                method: 'GET',
                params
            }),
            providesTags: [FEEDBACKLOGS]
        })
    })
});

export const {
    useGetFeedbackLogQuery,
    useGetPendingFeedbackLogQuery,
    useGetEmployeesFeedbackLogQuery,
} = feedbackApi;

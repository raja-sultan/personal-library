import { baseAPI } from "@services/base-api";
import { COMPENSATION_CYCLE } from "@services/tags";

export const compensationCycleApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getCompensationCycle: builder.query({
            query: ({ ...params }) => ({
                url: "compensation-cycles",
                method: "GET",
                params
            }),
            providesTags: [COMPENSATION_CYCLE],
        }),
        deleteSingleCycle: builder.mutation({
            query: ({ id }) => ({
                url: `compensation-cycles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [COMPENSATION_CYCLE],
        }),
        addNewCycle: builder.mutation({
            query: ({ body }) => ({
                url: 'compensation-cycles',
                method: 'POST',
                body
            }),
            invalidatesTags: [COMPENSATION_CYCLE]
        }),
        updateCycle: builder.mutation({
            query: ({ id, body }) => ({
                url: `compensation-cycles/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [COMPENSATION_CYCLE]
        }),
        getSingleCompensationCycle: builder.query({
            query: ({ id }) => ({
                url: `compensation-cycles/${id}`,
                method: "GET",
            }),
            providesTags: [COMPENSATION_CYCLE],
        }),
        getParticipants: builder.query({
            query: ({ ...params }) => ({
                url: 'compensation-cycles/list-participants',
                method: 'GET',
                params
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        getUserPromotionDetails: builder.query({
            query: ({ type }) => ({
                url: `reference-data/lookup?type=${type}`,
                method: 'GET',
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        getCompensationPromotionDetails: builder.query({
            query: ({ ...params }) => ({
                url: `compensation-cycles/promotion/nomination`,
                method: 'GET',
                params
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        getDataCheck: builder.query({
            query: ({ id, employeeIds }) => ({
                url: `compensation-cycles/${id}/data-check`,
                method: 'GET',
                params: { employeeIds }
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        getBudget: builder.query({
            query: ({ id }) => ({
                url: `compensation-cycles/${id}/budget`,
                method: 'GET',
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        getDistribute: builder.query({
            query: ({ id, ...params }) => ({
                url: `compensation-cycles/${id}/distribute`,
                method: 'GET',
                params
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        endCycle: builder.mutation({
            query: ({ id }) => ({
                url: `compensation-cycles/${id}/end`,
                method: 'PATCH',
            }),
            invalidatesTags: [COMPENSATION_CYCLE]
        }),
        addNominatedUser: builder.mutation({
            query: ({ ...body }) => ({
                url: `compensation-cycles/promotion/nomination`,
                method: 'POST',
                body
            }),
            invalidatesTags: [COMPENSATION_CYCLE]
        }),
        getNominatedUser: builder.query({
            query: ({ ...params }) => ({
                url: `compensation-cycles/promotion/nomination`,
                method: 'GET',
                params
            }),
            providesTags: [COMPENSATION_CYCLE]
        }),
        updateNominatedUser: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `compensation-cycles/promotion/nomination/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [COMPENSATION_CYCLE]
        }),
        getSingleCompensationEmployee: builder.query({
            query: ({ id }) => ({
                url: `/compensated-employees/${id}`,
                method: "GET",
            }),
            providesTags: [COMPENSATION_CYCLE],
        }),
    }),

});

export const {
    useGetCompensationCycleQuery,
    useDeleteSingleCycleMutation,
    useAddNewCycleMutation,
    useUpdateCycleMutation,
    useGetSingleCompensationCycleQuery,
    useLazyGetSingleCompensationCycleQuery,
    useGetParticipantsQuery,
    useLazyGetParticipantsQuery,
    useGetUserPromotionDetailsQuery,
    useLazyGetCompensationPromotionDetailsQuery,
    useGetDataCheckQuery,
    useGetBudgetQuery,
    useGetDistributeQuery,
    useEndCycleMutation,
    useAddNominatedUserMutation,
    useLazyGetNominatedUserQuery,
    useUpdateNominatedUserMutation,
    useGetSingleCompensationEmployeeQuery,
} = compensationCycleApi;

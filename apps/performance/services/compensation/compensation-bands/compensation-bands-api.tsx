import { baseAPI } from "@services/base-api";
import { COMPENSATION_BANDS, COMPENSATION_BAND_MEMBERS } from "@services/tags";

export const compensationBandsApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        compensationBandsList: builder.query({
            query: ({ departmentId, search, ...params }) => {
                const filteredParams = {
                    ...params,
                    ...(search ? { search } : {}),
                    ...(departmentId ? { departmentId } : {})
                };
                return {
                    url: "compensation-bands",
                    method: "GET",
                    params: filteredParams
                };
            },
            providesTags: [COMPENSATION_BANDS],
        }),
        compensationBandDetails: builder.query({
            query: ({ id }) => ({
                url: `compensation-bands/${id}`,
                method: "GET",
            }),
            providesTags: [COMPENSATION_BANDS]
        }),
        addNewBand: builder.mutation({
            query: (payload) => ({
                url: 'compensation-bands',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [COMPENSATION_BANDS]
        }),
        updateBand: builder.mutation({
            query: ({ id, values }) => ({
                url: `compensation-bands/${id}`,
                method: 'PATCH',
                body: values
            }),
            invalidatesTags: [COMPENSATION_BANDS]
        }),
        deleteBand: builder.mutation({
            query: ({ id }) => ({
                url: `compensation-bands/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [COMPENSATION_BANDS],
        }),
        getBandMembersById: builder.query({
            query: ({ id, params }) => ({
                url: `compensation-bands/${id}/members`,
                method: "GET",
                params
            }),
            providesTags: [COMPENSATION_BAND_MEMBERS],
        }),
        assignEmployees: builder.mutation({
            query: ({ id, employeeIds }) => ({
                url: `compensation-bands/${id}/employees/assign`,
                method: 'PATCH',
                body: { employeeIds }
            }),
            invalidatesTags: [COMPENSATION_BAND_MEMBERS]
        }),
        removeEmployees: builder.mutation({
            query: ({ id, employeeIds }) => ({
                url: `compensation-bands/${id}/employees/remove`,
                method: 'DELETE',
                body: { employeeIds }
            }),
            invalidatesTags: [COMPENSATION_BAND_MEMBERS]
        }),
    }),

});

export const {
    useCompensationBandsListQuery,
    useLazyCompensationBandDetailsQuery,
    useAddNewBandMutation,
    useUpdateBandMutation,
    useDeleteBandMutation,
    useGetBandMembersByIdQuery,
    useAssignEmployeesMutation,
    useRemoveEmployeesMutation
} = compensationBandsApi;

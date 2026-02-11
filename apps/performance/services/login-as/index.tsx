import { baseAPI } from "../base-api";
import { PROFILE, EMPLOYEES } from "../tags";


export const loginAsApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: ({ ...params }) => ({
                url: "reference-data/lookup",
                method: "GET",
                params
            }),
            providesTags: [EMPLOYEES],
        }),
        loginAs: builder.mutation({
            query: ({ id, session }) => ({
                url: `employees/${id}/login-as?activate-session=${session}`,
                method: "PUT",
            }),
            invalidatesTags: [PROFILE, EMPLOYEES],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useLoginAsMutation
} = loginAsApi;

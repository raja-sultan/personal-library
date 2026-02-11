import { baseAPI } from "@services/base-api";
import { DIRECTORY, generateTags } from "@services/tags";

export const directoryApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeesList: builder.query({
            query: ({ limit, offset, search }) => ({
                url: `employees?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ''}`,
                method: "GET",
            }),
            providesTags: (result) => generateTags(result?.data?.departments, DIRECTORY),
        }),
        getDepartments: builder.query({
            query: ({ limit, offset, search }) => ({
                url: `departments?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ''}`,
                method: "GET",
            }),
            providesTags: (result) => generateTags(result?.data?.departments, DIRECTORY),
        }),
    }),
});

export const {
    useGetEmployeesListQuery,
    useGetDepartmentsQuery
} = directoryApi;

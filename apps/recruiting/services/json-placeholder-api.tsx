import { baseAPI } from "./base-api";

export const jsonAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ params }) => ({
        url: "https://jsonplaceholder.typicode.com/users",
        params,
      }),
    }),
    getUserListForJobApprovals: builder.query({
      query: ({ params }) => ({
        url: "super-admin/system-admin/dropdown-get-all-users",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useLazyUsersQuery,
  useUsersQuery,
  useLazyGetUserListForJobApprovalsQuery,
  useGetUserListForJobApprovalsQuery,
} = jsonAPI;

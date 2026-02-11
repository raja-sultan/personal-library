import { baseAPI } from "@services/base-api";

const UserManagement = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (payload) => ({
        url: "/super-admin/system-admin/get-all-users",
        method: "GET",
        body: payload.body,
        params:payload.params, 
      }), 
    }),
    // updateUser: builder.mutation({
    //     query: (user: User) => ({
    //         url: "users",
    //         method: "PUT",
    //         body: user,
    //     }),
    //     invalidatesTags: [USERS],
    // }),
    // deleteUser: builder.mutation({
    //     query: (user: User) => ({
    //         url: "users",
    //         method: "DELETE",
    //         body: user,
    //     }),
    //     invalidatesTags: [USERS],
    // }),
  }),
});
export const { useGetUsersQuery, useLazyGetUsersQuery } = UserManagement;

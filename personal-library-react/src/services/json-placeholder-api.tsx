import { baseAPI } from "./base-api";

export const jsonAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ params }) => ({
        url: "https://jsonplaceholder.typicode.com/users",
        params,
      }),
    }),
  }),
});

export const { useLazyUsersQuery } = jsonAPI;

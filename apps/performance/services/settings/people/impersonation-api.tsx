import { baseAPI } from "@services/base-api";

export const impersonationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    impersonationList: builder.query({
      query: ({ ...queryParams }) => ({
        url: `/impersonations`,
        method: "GET",
        params: queryParams,
      }),
    }),
  }),
});

export const { useImpersonationListQuery } = impersonationApi;

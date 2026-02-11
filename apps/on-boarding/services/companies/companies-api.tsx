import { baseAPI } from "@services/base-api";

const Companies = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ params }) => ({
        url: `/companies`,
        method: "GET",
        params,
      }),
    }),
  }),
});
export const { useLazyGetCompaniesQuery } = Companies;

import { baseAPI } from "@services/base-api";

const Companies = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ params }) => {
        return {
          url: `/companies`,
          method: "GET",
          params: {
            search: params?.search === undefined ? "a" : params?.search,
          },
          transformResponse: (res: any) => {
            const items = res?.data?.items ?? [];
            console.log(items, "check transform response");

            return [];
          },
        };
      },
    }),
  }),
});
export const { useLazyGetCompaniesQuery } = Companies;

import { baseAPI } from "@services/base-api";
import { LOCATIONS } from "@services/tags";

export const companyLocationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyLocation: builder.query({
      query: () => ({
        url: "company-locations",
        method: "GET",
      }),
      providesTags: [LOCATIONS],
    }),
  }),
});

export const { useGetCompanyLocationQuery } = companyLocationAPI;

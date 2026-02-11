import { baseAPI } from "@services/base-api";

export const emailTeamApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: () => ({
        url: "configuration/get-email-templates",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return typeof response?.data === "object" ? response?.data : [];
      },
    }),
  }),
});

export const { useLazyGetEmailTemplatesQuery } = emailTeamApi;

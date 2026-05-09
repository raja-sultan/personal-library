import { baseAPI } from "@services/base-api";
import { PAGES } from "@services/tags";

export const PagesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postPages: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: `settings/create-wellcome-experience-pages`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PAGES],
    }),
  }),
});

export const { usePostPagesMutation } = PagesApi;

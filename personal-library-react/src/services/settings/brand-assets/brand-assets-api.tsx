import { baseAPI } from "@services/base-api";
import { BRANDED_ASSETS } from "@services/tags";

export const brandedAssetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createBrandedAsset: builder.mutation({
      query: ({ body }) => ({
        url: `settings/branded-assets`,
        method: "POST",
        body,
      }),
      invalidatesTags: [BRANDED_ASSETS],
    }),
  }),
});

export const { useCreateBrandedAssetMutation } = brandedAssetApi;

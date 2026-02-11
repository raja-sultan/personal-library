import { baseAPI } from "@services/base-api";
import { ONE_ON_ONE_FEEDBACK } from "@services/tags";

export const oneOnOnesSettingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    oneOnOnesSetting: builder.mutation({
      query: (body) => ({
        url: `/settings/one-on-one-setting`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ONE_ON_ONE_FEEDBACK],
    }),
  }),
});

export const { useOneOnOnesSettingMutation } = oneOnOnesSettingAPI;

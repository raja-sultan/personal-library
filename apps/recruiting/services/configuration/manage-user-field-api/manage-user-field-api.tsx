import { baseAPI } from "@services/base-api";
import { MANAGE_USER_FIELDS } from "@services/tags";

export const manageUserFieldsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getManageUserFields: builder.query({
      query: (_) => {
        return {
          url: `configuration/get-custom-fields?resourceType=user`,
          method: "GET",
        };
      },
      providesTags: [MANAGE_USER_FIELDS],
    }),
  }),
});
export const { useGetManageUserFieldsQuery } = manageUserFieldsApi;

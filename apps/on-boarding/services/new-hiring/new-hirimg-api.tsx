import { baseAPI } from "@services/base-api";
import { NEW_HIRING } from "@services/tags";

export const NewHiringApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNewHiring: builder.query({
      query: ({ params }: any) => {
        return {
          url: "NewHire/list-preview-experience",
          method: "GET",
          params,
        };
      },
      providesTags: [NEW_HIRING],
    }),
    postNewHiring: builder.mutation<null, any>({
      query: (payload) => ({
        url: `NewHire/create-hire`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [NEW_HIRING],
    }),
    getUsersList: builder.query({
      query: (payload) => ({
        url: "super-admin/system-admin/dropdown-get-all-users",
        method: "GET",
        params: payload.params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useGetNewHiringQuery,
  usePostNewHiringMutation,
  useLazyGetUsersListQuery,
  useGetUsersListQuery,
} = NewHiringApi;

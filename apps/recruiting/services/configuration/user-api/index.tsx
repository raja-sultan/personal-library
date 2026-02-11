import { baseAPI } from "@services/base-api";
import { USER_API } from "@services/tags";

const Tag = [USER_API];

const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllConfigurationUsers: builder.query({
      query: (payload) => ({
        url: "/configuration/users/list",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
     
    }),
    getSingleConfigurationUsers: builder.query({
      query: (payload) => ({
        url: `/configuration/get-user/${payload.params.userId}`,
        method: "GET",
      }),
      providesTags: Tag,
    }),

    createConfigurationUser: builder.mutation({
      query: (payload) => ({
        url: "/configuration/create-user",
        method: "POST",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
    downloadConfigurationUser: builder.query({
      query: (payload) => ({
        url: "/configuration/users/list/downloadexecel",
        method: "GET",
        params: payload.params,
        responseHandler: (response) => response.blob(),
      }),
    }),
    updateConfigurationUser: builder.mutation({
      query: (payload) => ({
        url: `/configuration/update-user`,
        method: "PUT",
        body: payload.body,
        params: payload.params,
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetAllConfigurationUsersQuery,
  useGetSingleConfigurationUsersQuery,
  useLazyGetSingleConfigurationUsersQuery,
  useCreateConfigurationUserMutation,
  useLazyDownloadConfigurationUserQuery,
   useUpdateConfigurationUserMutation,
} = userApi;

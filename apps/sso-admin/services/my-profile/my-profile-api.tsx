import { baseAPI } from "../base-api";
import { SSO_PROFILE } from "../tags";

export const myProfileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfileDataApi: builder.query({
      query: () => {
        return { url: "super-admin/view-profile", method: "GET" };
      },
      providesTags: [SSO_PROFILE],
    }),
    // patchMyProfileDataById: builder.mutation({
    //   query: ({ body, employeeId }: any) => {
    //     return {
    //       url: `super-admin/system-admin/update-user/${employeeId}`,
    //       body,
    //       method: "PATCH",
    //     };
    //   },
    //   invalidatesTags: [SSO_PROFILE],
    // }),
    patchMyProfileDataById: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `user-profile`,
          body,
          method: "PATCH",
        };
      },
      invalidatesTags: [SSO_PROFILE],
    }),

    //profile Image update and delete api's
    putProfileImage: builder.mutation({
      query: ({ profileImage }: any) => {
        return {
          url: `user-profile/profile-image`,
          method: "PUT",
          body: profileImage,
        };
      },
      invalidatesTags: [SSO_PROFILE],
    }),
    deleteProfileImage: builder.mutation({
      query: () => {
        return {
          url: `user-profile/profile-image`,
          method: "DELETE",
        };
      },
      invalidatesTags: [SSO_PROFILE],
    }),

    //cover Image update and delete api's
    putCoverImage: builder.mutation({
      query: ({ coverImage }: any) => {
        return {
          url: `/user-profile/cover-image`,
          method: "PUT",
          body: coverImage,
        };
      },
      invalidatesTags: [SSO_PROFILE],
    }),
    deleteCoverImageById: builder.mutation({
      query: () => {
        return {
          url: `user-profile/cover-image`,
          method: "DELETE",
        };
      },
      invalidatesTags: [SSO_PROFILE],
    }),
  }),
});

export const {
  useGetMyProfileDataApiQuery,
  usePatchMyProfileDataByIdMutation,
  //profile image
  usePutProfileImageMutation,
  useDeleteProfileImageMutation,
  //cover image
  usePutCoverImageMutation,
  useDeleteCoverImageByIdMutation,
} = myProfileAPI;

import { baseAPI } from "../base-api";
import { USERS } from "../tags";

export const myProfileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfileDataApi: builder.query({
      query: () => {
        return { url: "user-profile", method: "GET" };
      },
      providesTags: [USERS],
    }),
    patchMyProfileDataById: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `/user-profile`,
          body,
          method: "PATCH",
        };
      },
      invalidatesTags: [USERS],
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
      invalidatesTags: [USERS],
    }),
    deleteProfileImage: builder.mutation({
      query: () => {
        return {
          url: `user-profile/profile-image`,
          method: "DELETE",
        };
      },
      invalidatesTags: [USERS],
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
      invalidatesTags: [USERS],
    }),
    deleteCoverImageById: builder.mutation({
      query: () => {
        return {
          url: `user-profile/cover-image`,
          method: "DELETE",
        };
      },
      invalidatesTags: [USERS],
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

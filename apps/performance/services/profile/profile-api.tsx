import { baseAPI } from "../base-api";
import { GOALS, PROFILE } from "@services/tags";

export const profileApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "user-profile",
        method: "GET",
      }),
      providesTags: [PROFILE],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    uploadProfile: builder.mutation({
      query: (data: any) => ({
        url: "user-profile/profile-image",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [PROFILE],
    }),
    uploadCover: builder.mutation({
      query: (data: any) => ({
        url: "user-profile/cover-image",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [PROFILE],
    }),

    //Delete Picture
    deleteProfile: builder.mutation({
      query: () => ({
        url: "user-profile/profile-image",
        method: "DELETE",
      }),
      invalidatesTags: [PROFILE],
    }),
    deleteCover: builder.mutation({
      query: () => ({
        url: "user-profile/cover-image",
        method: "DELETE",
      }),
      invalidatesTags: [PROFILE],
    }),

    updateProfile: builder.mutation({
      query: (profile) => ({
        url: "/user-profile",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }),
      invalidatesTags: [PROFILE],
    }),
    getUserProfile: builder.query({
      query: (memberId) => ({
        url: `user-profile?memberId=${memberId}`,
        method: "GET",
      }),
      providesTags: [PROFILE, GOALS],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUploadProfileMutation,
  useUploadCoverMutation,
  useDeleteProfileMutation,
  useDeleteCoverMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
} = profileApi;

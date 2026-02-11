import { baseAPI } from "@services/base-api";
import { CAREER_PERMISSIONS } from "@services/tags";

export const careerPermissions = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCareerVision: builder.query({
      query: () => ({
        url: "/career-vision",
        method: "GET",
      }),
      providesTags: [CAREER_PERMISSIONS],
    }),

    getSingleCareerVision: builder.query({
      query: ({ id }) => ({
        url: `/career-vision/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_PERMISSIONS],
    }),

    postCareerVision: builder.mutation({
      query: ({ body }) => ({
        url: "/career-vision",
        method: "POST",
        body,
      }),
      invalidatesTags: [CAREER_PERMISSIONS],
    }),

    putCareerVision: builder.mutation({
      query: ({ body, id }) => ({
        url: `/career-vision/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [CAREER_PERMISSIONS],
    }),

    deleteCareerVision: builder.mutation({
      query: ({ id }) => ({
        url: `/career-vision/${id}`,
        method: "Delete",
      }),
      invalidatesTags: [CAREER_PERMISSIONS],
    }),

    postPlanPermissions: builder.mutation({
      query: ({ body }) => ({
        url: "/settings/career-settings",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [CAREER_PERMISSIONS],
    }),

    postCareerNotification: builder.mutation({
      query: ({ body }) => ({
        url: "/settings/career-notification",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [CAREER_PERMISSIONS],
    }),
  }),
});

export const {
  useGetCareerVisionQuery,
  useLazyGetSingleCareerVisionQuery,
  usePostCareerVisionMutation,
  useDeleteCareerVisionMutation,
  usePutCareerVisionMutation,
  usePostPlanPermissionsMutation,
  usePostCareerNotificationMutation,
} = careerPermissions;

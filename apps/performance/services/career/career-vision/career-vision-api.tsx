import { baseAPI } from "@services/base-api";
import { CAREER_VISION } from "@services/tags";

export const careerVision = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCareerVisionComments: builder.query({
      query: ({ id }) => ({
        url: `career-vision/view/comments?visionId=${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_VISION],
    }),

    deleteCareerVisionComments: builder.mutation({
      query: ({ id }) => ({
        url: `career-vision/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [CAREER_VISION],
    }),

    postCareerVisionComments: builder.mutation({
      query: ({ payload }) => ({
        url: `career-vision/comment`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [CAREER_VISION],
    }),

    putCareerVisionComments: builder.mutation({
      query: ({ payload,id}) => ({
        url: `career-vision/comment/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CAREER_VISION],
    }),
    getCareerVision: builder.query({
      query: () => ({
        url: 'career-vision',
        method: "GET",
      }),
      providesTags: [CAREER_VISION],
    }),
    addCareerVision: builder.mutation({
      query: ( queryArg ) => ({
        url: 'career-vision',
        method: "POST",
        body: queryArg,
      }),
      invalidatesTags: [CAREER_VISION],
    }),
    putCareerVision: builder.mutation({
      query: ({ payload,id}) => ({
        url: `career-vision/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CAREER_VISION],
    }),
    getCareerVisionById: builder.query({
      query: ({ id }) => ({
        url: `/career-vision/${id}`,
        method: "GET",
      }),
      providesTags: [CAREER_VISION],
    }),
    deleteCareerVision: builder.mutation({
      query: ({ id }) => ({
        url: `career-vision/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [CAREER_VISION],
    }),

  }),
});

export const {
  useGetCareerVisionCommentsQuery,
  useDeleteCareerVisionCommentsMutation,
  usePostCareerVisionCommentsMutation,
  usePutCareerVisionCommentsMutation,
  useGetCareerVisionQuery,
  useAddCareerVisionMutation,
  usePutCareerVisionMutation,
  useGetCareerVisionByIdQuery,
  useDeleteCareerVisionMutation
} = careerVision;

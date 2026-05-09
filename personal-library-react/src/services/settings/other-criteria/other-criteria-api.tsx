import { baseAPI } from "@services/base-api";
import { OTHER_CRITERIA } from "@services/tags";

export const OtherCriteriaAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postOtherCriteria: builder.mutation({
      query: ({ body }) => ({
        url: `Criteria/create-criteria`,
        method: "POST",
        body,
      }),
      invalidatesTags: [OTHER_CRITERIA],
    }),
    getOtherCriteriaListApi: builder.query({
      query: ({ params }: any) => {
        return {
          url: `Criteria/criteria/list`,
          method: "GET",
          params,
        };
      },
      providesTags: [OTHER_CRITERIA],
    }),
    putOtherCriteria: builder.mutation({
      query: ({ body, criteriaId }) => ({
        url: `Criteria/criteria/${criteriaId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [OTHER_CRITERIA],
    }),
    deleteOtherCriteria: builder.mutation({
      query: (criteriaId) => {
        return {
          url: `Criteria/delete-criteria/${criteriaId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [OTHER_CRITERIA],
    }),
  }),
});
export const {
  usePostOtherCriteriaMutation,
  useGetOtherCriteriaListApiQuery,
  usePutOtherCriteriaMutation,
  useDeleteOtherCriteriaMutation,
} = OtherCriteriaAPI;

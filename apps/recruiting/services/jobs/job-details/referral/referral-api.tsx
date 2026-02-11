import { baseAPI } from "@services/base-api";
import { REFERRAL_LIST } from "@services/tags";

export const ReferralApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReferralApi: builder.query({
      query: (paramsData) => ({
        url: `referral/referral-list`,
        params: paramsData,
      }),
      providesTags: [REFERRAL_LIST],
    }),
    getJobList: builder.query({
      query: ({ params }: any) => ({
        url: "jobs/dropdown-jobs-list",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    addReferral: builder.mutation({
      query: ({ formData }) => ({
        url: `referral/add-job-referral`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [REFERRAL_LIST],
    }),
  }),
});

export const {
  useGetReferralApiQuery,
  useLazyGetJobListQuery,
  useAddReferralMutation,
} = ReferralApi;

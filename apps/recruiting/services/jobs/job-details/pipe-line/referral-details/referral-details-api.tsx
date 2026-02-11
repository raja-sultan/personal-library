import { baseAPI } from "@services/base-api";
import { REFERRAL_DETAILS } from "@services/tags";

export const referralDetailsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReferralDetails: builder.query({
      query: ({ referralId }: any) => ({
        url: `referral/get-referral/${referralId}`,
        method: "GET",
      }),
      providesTags: [REFERRAL_DETAILS],
    }),
  }),
});

export const { useGetReferralDetailsQuery, useLazyGetReferralDetailsQuery } =
  referralDetailsApi;

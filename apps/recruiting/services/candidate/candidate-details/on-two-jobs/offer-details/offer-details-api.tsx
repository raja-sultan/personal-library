import { baseAPI } from "@services/base-api";
import { OFFER_DETAILS } from "@services/tags";

export const offerDetailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postOfferCandidate: builder.mutation({
      query: (payload) => ({
        url: `offer/create-offer-candidate`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [OFFER_DETAILS],
    }),
    postRequestOfferApproval: builder.mutation({
      query: (payload) => ({
        url: `/offer/request-offer-approvals`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [OFFER_DETAILS],
    }),
    putMarkCandidateAsHired: builder.mutation({
      query: (payload) => ({
        url: `offer/marked-candidate-as-hired`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [OFFER_DETAILS],
    }),
    getOfferCandidate: builder.query({
      query: ({ candidateId }) => ({
        url: `offer/get-candidate-offer?candidateId=${candidateId}`,
        method: "GET",
      }),
      providesTags: [OFFER_DETAILS],
    }),
  }),
});

export const {
  usePostOfferCandidateMutation,
  useGetOfferCandidateQuery,
  usePostRequestOfferApprovalMutation,
  usePutMarkCandidateAsHiredMutation,
} = offerDetailApi;

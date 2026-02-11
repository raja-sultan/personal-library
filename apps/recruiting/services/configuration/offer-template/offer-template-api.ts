import { baseAPI } from "@services/base-api";
import { OFFER_TEMPLATE } from "@services/tags";

export const OfferTemplateApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOfferTemplateListApi: builder.query({
      query: (params) => {
        return {
          url: `configuration/offer-template/list`,
          method: "GET",
          params,
        };
      },
      providesTags: [OFFER_TEMPLATE],
    }),
    getOfferTemplateById: builder.query({
      query: (templateId) => {
        return {
          url: `configuration/offer-template/get/${templateId}`,
          method: "GET",
        };
      },
      providesTags: [OFFER_TEMPLATE],
    }),
    postOfferTemplate: builder.mutation({
      query: ({ body }) => ({
        url: "configuration/offer-template/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [OFFER_TEMPLATE],
    }),
    patchOfferTemplate: builder.mutation({
      query: ({ body, templateId }: any) => ({
        url: `configuration/update-offer-template/${templateId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [OFFER_TEMPLATE],
    }),
    deleteOfferTemplate: builder.mutation({
      query: (templateId) => {
        return {
          url: `configuration/delete-offer-template/${templateId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [OFFER_TEMPLATE],
    }),
  }),
});

export const {
  useGetOfferTemplateListApiQuery,
  useGetOfferTemplateByIdQuery,
  usePostOfferTemplateMutation,
  usePatchOfferTemplateMutation,
  useDeleteOfferTemplateMutation,
} = OfferTemplateApi;

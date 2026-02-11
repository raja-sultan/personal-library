import { baseAPI } from "@services/base-api";
import { EMAIL_TEMPLATES } from "@services/tags";

export const EmailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Email Template APIs
    getEmailMyTemplates: builder.query({
      query: () => {
        return {
          url: "configuration/get-email-my-templates",
          method: "GET",
        };
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
    getEmailTemplates: builder.query({
      query: (payload) => {
        return {
          url: "configuration/get-email-templates",
          method: "GET",
          body: payload.body,
          params: payload.params,
        };
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
    getTemplateById: builder.query({
      query: (payload) => {
        return {
          url: "configuration/get-email-template-by-id",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
    patchTemplates: builder.mutation<null, any>({
      query: ({ body, subtemplateQueryParams }: any) => ({
        url: `configuration/update-email-template-by-id?templateId=${subtemplateQueryParams?.templateId}&emailType=${subtemplateQueryParams?.emailType}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    createTemplates: builder.mutation<null, any>({
      query: ({ body, queryParams }: any) => ({
        url: "configuration/create-email-template",
        method: "POST",
        params: queryParams,
        body,
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    // Sub Template APIs
    createSubTemplates: builder.mutation<null, any>({
      query: ({ body, queryParams }: any) => ({
        url: `configuration/create-sub-email-template`,
        method: "POST",
        params: queryParams,
        body,
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    getSubTemplateById: builder.query({
      query: (payload) => {
        return {
          url: "/configuration/get-sub-email-template-by-id",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
    patchSubTemplates: builder.mutation<null, any>({
      query: ({ body, subtemplateid }: any) => ({
        url: `configuration/update-sub-email-template-by-id?subtemplateid=${subtemplateid}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    deleteSubTemplateList: builder.mutation<null, any>({
      query: (subTemplateId) => ({
        url: `/configuration/delete-sub-email-template/${subTemplateId}`,
        method: "DELETE",
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    // Global Email APIs
    addGlobalEmail: builder.mutation<null, any>({
      query: ({ body }) => ({
        url: "configuration/email-verification/add-global-email",
        method: "POST",
        body,
      }),
      invalidatesTags: [EMAIL_TEMPLATES],
    }),
    getGlobalEmail: builder.query({
      query: ({ companyId }) => {
        return {
          url: `configuration/email-verification/global-email/list/${companyId}`,
          method: "GET",
        };
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
    getGlobalEmailForDropdown: builder.query({
      query: ({ params }) => {
        return {
          url: `configuration/email-verification/global-email/list/${params?.companyId}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response?.data?.filter((x: any) => x?.isVerify);
      },
      providesTags: [EMAIL_TEMPLATES],
    }),
  }),
});

export const {
  useGetEmailMyTemplatesQuery,
  useGetEmailTemplatesQuery,
  useCreateTemplatesMutation,
  useGetTemplateByIdQuery,
  usePatchTemplatesMutation,
  // Sub Template APIs
  useCreateSubTemplatesMutation,
  useGetSubTemplateByIdQuery,
  useDeleteSubTemplateListMutation,
  usePatchSubTemplatesMutation,
  // Email Setting APIs
  useAddGlobalEmailMutation,
  useGetGlobalEmailQuery,
  useLazyGetGlobalEmailForDropdownQuery,
} = EmailTemplatesApi;

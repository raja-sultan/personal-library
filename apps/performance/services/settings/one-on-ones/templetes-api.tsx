import { baseAPI } from "@services/base-api";
import { ONE_ON_ONES_TEMPLATES } from "@services/tags";

export const templatesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: ({ status, search, mine, limit, offset }) => ({
        url: `/one-on-one-template?limit=${limit}&offset=${offset}&status=${status}`,
        method: "GET",
        params: { search, mine },
      }),
      providesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    getManageTemplateList: builder.query({
      query: ({ ...params }) => ({
        url: `/one-on-one-template/applied-templates`,
        method: "GET",
        params,
      }),
      providesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    addTemplates: builder.mutation({
      query: ({ ...body }) => ({
        url: "/one-on-one-template",
        method: "POST",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    getTemplateDetailsById: builder.query({
      query: ({ id }) => ({
        url: `/one-on-one-template/view/${id}`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    updateTemplate: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/one-on-one-template/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    updateTemplateEvent: builder.mutation({
      query: ({ id, text, category }) => ({
        url: `/one-on-one-template/events/${id}`,
        method: "PUT",
        body: { text, category },
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    getTemplateEvents: builder.query({
      query: ({ recurring }) => ({
        url: `/one-on-one-template/event-points/?recurring=${recurring}`,
        method: "GET",
      }),
      providesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    addTemplateEvent: builder.mutation({
      query: (body) => ({
        url: `/one-on-one-template/event-points`,
        method: "POST",
        body,
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    deleteTemplatesEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/one-on-one-template/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    duplicatTemplates: builder.mutation({
      query: ({ templateId }) => ({
        url: `/one-on-one-template/duplicate/${templateId}`,
        method: "POST",
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),
    activatedDeactivatedTemplates: builder.mutation({
      query: ({ templateId, status }) => ({
        url: `/one-on-one-template/${templateId}?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),

    deleteTemplates: builder.mutation({
      query: ({ templateId }) => ({
        url: `/one-on-one-template/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),

    applyTemplates: builder.mutation({
      query: ({ templateId, userId, applyTo }) => ({
        url: `/one-on-one-template/apply-template?applyTo=${applyTo}&userId=${userId}&templateId=${templateId}`,
        method: "POST",
      }),
      invalidatesTags: [ONE_ON_ONES_TEMPLATES],
    }),

    getAppliedTemplates: builder.query({
      query: ({ id, search }) => ({
        url: `/one-on-one-template/applied-history/${id}`,
        method: "GET",
        params: { search },
      }),
      providesTags: [ONE_ON_ONES_TEMPLATES],
    }),
  }),
});

export const {
  useGetTemplateEventsQuery,
  useAddTemplatesMutation,
  useGetTemplatesQuery,
  useGetManageTemplateListQuery,
  useDuplicatTemplatesMutation,
  useActivatedDeactivatedTemplatesMutation,
  useDeleteTemplatesMutation,
  useLazyGetTemplateDetailsByIdQuery,
  useUpdateTemplateMutation,
  useUpdateTemplateEventMutation,
  useAddTemplateEventMutation,
  useDeleteTemplatesEventMutation,
  useApplyTemplatesMutation,
  useLazyGetAppliedTemplatesQuery
} = templatesAPI;

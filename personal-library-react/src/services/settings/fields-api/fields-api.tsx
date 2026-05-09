import { baseAPI } from "@services/base-api";
import { FIELD_API } from "@services/tags";

const Tag = [FIELD_API];

const FieldsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFieldsGroupList: builder.query({
      query: (payload) => ({
        url: "/settings/field-group",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    getSingleFieldsGroupList: builder.query({
      query: (payload) => ({
        url: `/settings/field-group/${payload.params.fieldGroupId}`,
        method: "GET",
      }),
      providesTags: Tag,
    }),

    postFieldsGroupList: builder.mutation({
      query: (payload) => ({
        url: `/settings/field-group`,
        method: "POST",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    putFieldsGroupList: builder.mutation({
      query: (payload) => ({
        url: `/settings/field-group/${payload.params.fieldGroupId}`,
        method: "put",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),

    postSubFieldsGroupList: builder.mutation({
      query: (payload) => ({
        url: `/settings/field/${payload.params.fieldGroupId}`,
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    getSubFieldsGroupsSingleList: builder.query({
      query: (payload) => ({
        url: `/settings/field/${payload.params.fieldGroupId}/${payload.params.fieldId}`,
        method: "GET",
      }),
      providesTags: Tag,
    }),
    putSubFieldsGroupsSingleList: builder.mutation({
      query: (payload) => ({
        url: `/settings/field/${payload.params.fieldGroupId}/${payload.params.fieldId}`,
        method: "Put",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    patchsubFieldsRearrangeList: builder.mutation({
      query: (payload) => ({
        url: `/settings/field/rearrange/${payload.params.fieldGroupId}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetFieldsGroupListQuery,
  usePostFieldsGroupListMutation,
  usePutFieldsGroupListMutation,
  useLazyGetSingleFieldsGroupListQuery,
  usePostSubFieldsGroupListMutation,
  useLazyGetFieldsGroupListQuery,
  useLazyGetSubFieldsGroupsSingleListQuery,
  usePutSubFieldsGroupsSingleListMutation,
  usePatchsubFieldsRearrangeListMutation,
} = FieldsApi;

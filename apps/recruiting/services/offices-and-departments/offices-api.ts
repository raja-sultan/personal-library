import { baseAPI } from "@services/base-api";
import { OFFICE_API } from "@services/tags";

export const OfficesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOfficesList: builder.query({
      query: (payload) => {
        return {
          url: "organization/get-office-list",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [OFFICE_API],
    }),
    postOffice: builder.mutation<null, any>({
      query: (payload) => ({
        url: "organization/create-office",
        method: "POST",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: [OFFICE_API],
    }),
    putOffice: builder.mutation<null, any>({
      query: (payload) => ({
        url: `organization/office/${payload.id}`,
        method: "PUT",
        params: payload.params,
        body: payload.body,
      }),
      invalidatesTags: [OFFICE_API],
    }),
    deleteOffice: builder.mutation<null, any>({
      query: (payload) => ({
        url: `organization/office/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [OFFICE_API],
    }),
    dropdownOfficeList: builder.query({
      query: () => {
        return {
          url: "/organization/dropdown-office-list",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetOfficesListQuery,
  useLazyGetOfficesListQuery,
  usePostOfficeMutation,
  usePutOfficeMutation,
  useDeleteOfficeMutation,
  useLazyDropdownOfficeListQuery
} = OfficesApi;

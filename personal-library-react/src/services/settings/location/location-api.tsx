import { baseAPI } from "@services/base-api";
import { LOCATIONS } from "@services/tags";

export const locationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postLocationData: builder.mutation({
      query: ({ body }) => ({
        url: `organization/create-office`,
        method: "POST",
        body,
      }),
      invalidatesTags: [LOCATIONS],
    }),
    getLocationList: builder.query({
      query: ({ limit, offset, search }) => ({
        url: `organization/get-office-list?limit=${limit}&offset=${offset}`,
        method: "GET",
        search,
      }),
      providesTags: [LOCATIONS],
    }),
    updateLocationList: builder.mutation({
      query: ({ body, id }) => ({
        url: `organization/office/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [LOCATIONS],
    }),
    deleteLocationList: builder.mutation({
      query: ({ id }) => ({
        url: `organization/office/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [LOCATIONS],
    }),
  }),
});

export const {
  usePostLocationDataMutation,
  useGetLocationListQuery,
  useDeleteLocationListMutation,
  useUpdateLocationListMutation,
} = locationApi;


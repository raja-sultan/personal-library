import { baseAPI } from "@services/base-api";
import { RESOURCES, generateTags } from "@services/tags";

export const resourcesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getResourcesList: builder.query({
      query: ({ type }) => ({
        url: `resources?type=${type}`,
        method: "GET",
      }),
      providesTags: (result) => generateTags(result?.data?.data, RESOURCES),
    }),
    addResource: builder.mutation({
      query: ({ name, type }) => ({
        url: `resources?name=${name}&type=${type}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [RESOURCES],
    }),
    deleteResource: builder.mutation({
      query: ({ id }) => ({
        url: `resources/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [RESOURCES],
    }),
  }),
});

export const {
  useGetResourcesListQuery,
  useAddResourceMutation,
  useDeleteResourceMutation,
} = resourcesApi;

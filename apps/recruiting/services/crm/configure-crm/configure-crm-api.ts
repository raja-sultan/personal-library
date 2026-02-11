import { baseAPI } from "@services/base-api";
import { CONFIGURE_POOL } from "@services/tags";

export const configureCRMApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPoolTableDataApi: builder.query({
      query: (params) => {
        return {
          url: `crm/pools/list`,
          method: "GET",
          params,
        };
      },
      providesTags: [CONFIGURE_POOL],
    }),
    createProspectPool: builder.mutation({
      query: ({ body }) => ({
        url: "crm/create-prospect-pool",
        method: "POST",
        body,
      }),
      invalidatesTags: [CONFIGURE_POOL],
    }),
    patchProspectPool: builder.mutation({
      query: ({ body, poolId }) => ({
        url: `crm/update-prospect-pool/${poolId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [CONFIGURE_POOL],
    }),
    putPoolArchiveRestored: builder.mutation({
      query: ({ body, poolId }) => ({
        url: `crm/pool-archive-restore/${poolId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [CONFIGURE_POOL],
    }),
    deleteProspectPool: builder.mutation({
      query: (poolId) => {
        return {
          url: `crm/delete-prospect-pool/${poolId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [CONFIGURE_POOL],
    }),
  }),
});

export const {
  useGetPoolTableDataApiQuery,
  usePutPoolArchiveRestoredMutation,
  useDeleteProspectPoolMutation,
  useCreateProspectPoolMutation,
  usePatchProspectPoolMutation,
} = configureCRMApi;

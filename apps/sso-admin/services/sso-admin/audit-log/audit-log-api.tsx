import { baseAPI } from "@services/base-api";
import { AUDIT_LOGS } from "@services/tags";

export const auditLogApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogDetails: builder.query({
      query: (payload) => {
        return {
          url: "super-admin/audit-logs",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [AUDIT_LOGS],
    }),
  }),
});

export const { useGetAuditLogDetailsQuery, useLazyGetAuditLogDetailsQuery } =
  auditLogApi;

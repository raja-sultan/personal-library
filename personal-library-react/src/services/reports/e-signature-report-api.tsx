import { baseAPI } from "@services/base-api";
import { ESIGNATURE_API } from "@services/tags";

export const EsignatureApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEsignatureList: builder.query({
      query: (params) => {
        return {
          url: "Reports/esignature/list",
          method: "GET",
          params,
        };
      },
      providesTags: [ESIGNATURE_API],
    }),
    
  }), 
});

export const {
  useGetEsignatureListQuery, 
} = EsignatureApi;

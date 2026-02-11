import { baseAPI } from "@services/base-api";
import { BACK_UP } from "@services/tags";

export const backUpApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBackUpDetails: builder.query({
      query: (payload) => {
        return {
          url: "backup/list",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [BACK_UP],
    }),
    getDownloadAbleFile: builder.query({
      query: (payload) => {
        return {
          url: "backup/file",
          method: "GET",
          params: payload.params,
        };
      },
      providesTags: [BACK_UP],
    }),
  }),
});

export const {
  useGetBackUpDetailsQuery,
  useLazyGetBackUpDetailsQuery,
  useLazyGetDownloadAbleFileQuery,
} = backUpApi;

import { baseAPI } from "@services/base-api";
import { JOB_CANDIDATE } from "@services/tags";

export const detailTabApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDetailTabDataApi: builder.query({
      query: ({ candidateId }: any) => {
        return {
          url: `candidates/get-job-candidate`,
          method: "GET",
          params: { candidateId },
        };
      },
      providesTags: [JOB_CANDIDATE],
    }),
    putJobCandidate: builder.mutation<null, any>({
      query: ({ body, candidateId }: any) => ({
        url: `candidates/update-job-candidate?candidateId=${candidateId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [JOB_CANDIDATE],
    }),
  }),
});

export const { useGetDetailTabDataApiQuery, usePutJobCandidateMutation } =
  detailTabApi;

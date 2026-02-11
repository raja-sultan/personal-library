import { baseAPI } from "@services/base-api";
const TAG = "GET_JOB_CANDIDATES";
export const MakeANoteAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    makeNoteData: builder.mutation({
      query: ({ payload, candidateId }: any) => ({
        url: `candidates/make-note/${candidateId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useMakeNoteDataMutation } = MakeANoteAPI;

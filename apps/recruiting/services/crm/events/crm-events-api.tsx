import { baseAPI } from "@services/base-api";
import { EVENT } from "@services/tags";

const TAG = "crm_events";
const CrmEventsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCRMEventsForTable: builder.query({
      query: ({ params }) => ({
        url: `/crm/crm-event-list`,
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    addCreateEvent: builder.mutation<null, any>({
      query: (payload) => ({
        url: "crm/create-event",
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: [EVENT],
    }),
    updateEvent: builder.mutation<null, any>({
      query: ({body, eventId}) => ({
        url: `crm/crm-event/${eventId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [EVENT],
    }),


    getSingleEventDetail: builder.query({
      query: ({ params }) => ({
        url: `/crm/event-detail/${params.event_id}`,
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    getAllProspectPool: builder.query({
      query: ({ params }) => ({
        url: `/crm/dropdown-get-all-prospect-pool`,
        method: "GET",
        params,
      }),
      providesTags: [TAG],
    }),
    getProspectsDropdownList: builder.query({
      query: ({ params }) => ({
        url: `/crm/dropdown-pool-stages-list`,
        method: "GET",
        params,
      }),
      transformResponse: (res) => {
        const { data }: any = res;
        return data;
      },
      providesTags: [TAG],
    }),
    getCandidateTagDropDownList: builder.query({
      query: () => ({
        url: `/configuration/candidate-tag/list`,
        method: "GET",
        params: {
          limit: 2000,
          offset: 0,
        },
      }),
      providesTags: [TAG],
    }),
  }),
});
export const {
  useGetCRMEventsForTableQuery,
  useAddCreateEventMutation,
  useUpdateEventMutation,
  useGetSingleEventDetailQuery,
  useLazyGetProspectsDropdownListQuery,
  useGetProspectsDropdownListQuery,
  useLazyGetAllProspectPoolQuery,
  useLazyGetCandidateTagDropDownListQuery,
} = CrmEventsApi;

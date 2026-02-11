import { baseAPI as api } from "@services/base-api";
import { REFERENCE_DATA } from "../tags";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReferenceData: build.query<
      GetReferenceDataResponse,
      GetReferenceDataPayload
    >({
      query: () => ({ url: `/reference-data` }),
      providesTags: [REFERENCE_DATA],
    }),

    getReferenceDataLookup: build.query({
      query: ({ ...query }) => ({
        url: `reference-data/lookup`,
        method: "GET",
        params: query,
      }),
      providesTags: [REFERENCE_DATA],
    }),

    getReferenceDataAddressLocations: build.query<
      GetReferenceDataAddressLocationsResponse,
      any
    >({
      query: ({ params }) => ({
        url: `/reference-data/address-locations`,
        params,
      }),
      // providesTags: [REFERENCE_DATA],
    }),
    getReferenceDataAddressLocationsById: build.query<
      GetReferenceDataAddressLocationsByIdResponse,
      GetReferenceDataAddressLocationsByIdPayload
    >({
      query: (queryArg) => ({
        url: `/reference-data/address-locations/${queryArg.id}`,
      }),
      // providesTags: [REFERENCE_DATA],
    }),
    getReferenceDataStates: build.query<
      GetReferenceDataStatesResponse,
      GetReferenceDataStatesPayload
    >({
      query: (queryArg) => ({
        url: `/reference-data/states`,
        params: { country: queryArg.country },
      }),
      providesTags: [REFERENCE_DATA],
    }),
    getReferenceDataCities: build.query<
      GetReferenceDataCitiesResponse,
      GetReferenceDataCitiesPayload
    >({
      query: (queryArg) => ({
        url: `/reference-data/cities`,
        params: { state: queryArg.state },
      }),
      providesTags: [REFERENCE_DATA],
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type GetReferenceDataResponse =
  /** status 200  */ ListReferenceDataResponseDto;
export type GetReferenceDataPayload = any;
export type GetReferenceDataAddressLocationsResponse =
  /** status 200  */ SearchAddressLocationsResponse;
export interface GetReferenceDataAddressLocationsPayload {
  params: object;
}
export type GetReferenceDataAddressLocationsByIdResponse =
  /** status 200  */ GetAddressLocationResponse;
export interface GetReferenceDataAddressLocationsByIdPayload {
  id: string;
}
export type GetReferenceDataStatesResponse =
  /** status 200  */ StatesResponseDto;
export interface GetReferenceDataStatesPayload {
  country: string;
}
export type GetReferenceDataCitiesResponse =
  /** status 200  */ CitiesResponseDto;
export interface GetReferenceDataCitiesPayload {
  state: string;
}
export interface ListReferenceDataResponseDto {
  data: object | null;
  message: string | null;
  errors: object | null;
}
export interface SearchAddressLocationsResponse {
  data: object | null;
  message: string | null;
  errors: object | null;
}
export interface GetAddressLocationResponse {
  data: object | null | { addressLine: string, city: string, country: string, state: string, zipCode: string };
  message: string | null;
  errors: object | null;
}
export interface StatesResponseDto {
  data: string[] | null;
  message: string | null;
  errors: object | null;
}
export interface CitiesResponseDto {
  data: string[] | null;
  message: string | null;
  errors: object | null;
}
export const {
  useGetReferenceDataQuery,
  useLazyGetReferenceDataQuery,
  useGetReferenceDataAddressLocationsQuery,
  useLazyGetReferenceDataAddressLocationsQuery,
  useGetReferenceDataAddressLocationsByIdQuery,
  useLazyGetReferenceDataAddressLocationsByIdQuery,
  useGetReferenceDataStatesQuery,
  useLazyGetReferenceDataStatesQuery,
  useGetReferenceDataCitiesQuery,
  useLazyGetReferenceDataCitiesQuery,
  useGetReferenceDataLookupQuery,
  useLazyGetReferenceDataLookupQuery
} = injectedRtkApi;

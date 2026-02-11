import { baseAPI as api } from "@services/base-api";

export const addTagTypes = ["Company Locations"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getCompanyLocations: build.query<
                GetCompanyLocationsResponse,
                GetCompanyLocationsPayload
            >({
                query: () => ({ url: `/company-locations` }),
                providesTags: ["Company Locations"],
            }),
            addCompanyLocation: build.mutation<
                PostCompanyLocationsResponse,
                PostCompanyLocationsPayload
            >({
                query: (queryArg) => ({
                    url: `/company-locations`,
                    method: "POST",
                    body: { address: queryArg?.address },
                }),
                invalidatesTags: ["Company Locations"],
            }),
            updateCompanyLocation: build.mutation<
                PatchCompanyLocationsByIdResponse,
                PatchCompanyLocationsByIdPayload
            >({
                query: (queryArg) => ({
                    url: `/company-locations/${queryArg?.id}`,
                    method: "PATCH",
                    body: { address: queryArg?.address },
                }),
                invalidatesTags: ["Company Locations"],
            }),
            deleteCompanyLocation: build.mutation<
                DeleteCompanyLocationsByIdResponse,
                DeleteCompanyLocationsByIdPayload
            >({
                query: (queryArg) => ({
                    url: `/company-locations/${queryArg?.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Company Locations"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetCompanyLocationsResponse = any;
export type GetCompanyLocationsPayload = any;
export type PostCompanyLocationsResponse = any;
export interface PostCompanyLocationsPayload {
    address: string;
};
export type PatchCompanyLocationsByIdResponse = any;
export interface PatchCompanyLocationsByIdPayload {
    id?: string;
    address?: string;
};
export type DeleteCompanyLocationsByIdResponse = any;
export interface DeleteCompanyLocationsByIdPayload {
    id: string;
};
export const {
    useGetCompanyLocationsQuery,
    useLazyGetCompanyLocationsQuery,
    useAddCompanyLocationMutation,
    useUpdateCompanyLocationMutation,
    useDeleteCompanyLocationMutation,
} = injectedRtkApi;

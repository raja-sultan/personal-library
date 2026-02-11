import { baseAPI as api } from "@services/base-api";
import { ONE_ON_ONE_FEEDBACK } from "@services/tags";

// export const addTagTypes = ["Settings"] as const;
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
      getSettingsCompanyDetails: build.query<
        GetSettingsCompanyDetailsResponse,
        GetSettingsCompanyDetailsPayload
      >({
        query: () => ({ url: `/settings/company-details` }),
        providesTags: [ONE_ON_ONE_FEEDBACK],
      }),
      updateCompanyDetails: build.mutation<
        PatchSettingsCompanyDetailsResponse,
        PatchSettingsCompanyDetailsPayload
      >({
        query: (queryArg) => ({
          url: `/settings/company-details`,
          method: "PATCH",
          body: queryArg,
        }),
        invalidatesTags: [ONE_ON_ONE_FEEDBACK],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type GetSettingsCompanyDetailsResponse = any;
export type GetSettingsCompanyDetailsPayload = any;
export type PatchSettingsCompanyDetailsResponse = any;
export interface PatchSettingsCompanyDetailsPayload {
  updateCompanyProfileDto: UpdateCompanyProfileDto;
};
export interface UpdateCompanyProfileDto {
  companyLogo?: Blob;
  contactNumber?: string;
  companyName?: string;
  companySize?: CompanySize;
  website?: string;
  missionStatement?: string;
  emailDomain?: string;
  timeZone?: TimeZone;
  currency?: string;
  limitInvite?: boolean;
};
export enum CompanySize {
  $140 = "1-40",
  $4175 = "41-75",
  $76250 = "76-250",
  $2511000 = "251-1000",
  $1000 = "1000+",
}
export enum TimeZone {
  UtcCoordinatedUniversalTime = "UTC (Coordinated Universal Time)",
  GmtGreenwichMeanTime = "GMT (Greenwich Mean Time)",
  EstEasternStandardTime = "EST (Eastern Standard Time)",
  CstCentralStandardTime = "CST (Central Standard Time)",
  MstMountainStandardTime = "MST (Mountain Standard Time)",
  PstPacificStandardTime = "PST (Pacific Standard Time)",
}
export const {
  useGetSettingsCompanyDetailsQuery,
  useLazyGetSettingsCompanyDetailsQuery,
  useUpdateCompanyDetailsMutation,
} = injectedRtkApi;

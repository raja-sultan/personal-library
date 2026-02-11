import React from "react";
import { RHFAutocompleteAsync, RHFCustomSelect } from "common/components";
import {
  CompanyNameIcon,
  CompanySizeIcon,
  CountryIcon,
  SearchIcon,
} from "common/assets";
import { companySizeData, countryData } from "./sign-up.data";

export function SignUpCompanyFormOne({
  useLazyGetCompaniesQuery,
}: any): JSX.Element {
  const apiQuery = useLazyGetCompaniesQuery();

  return (
    <>
      <RHFAutocompleteAsync
        outerLabel="Company Name"
        placeholder="Enter here"
        name="companyName"
        apiQuery={apiQuery}
        StartIcon={<CompanyNameIcon sx={{ mr: 1 }} />}
        EndIcon={<SearchIcon />}
        sx={{
          "& .MuiOutlinedInput-root": {
            pr: "10px !important",
          },
        }}
        transformResponse={(res) => res?.data?.items ?? []}
        isOptionEqualToValue={(option: any, newValue: any) =>
          option.company_number === newValue.company_number
        }
        getOptionLabel={(option: any) => option?.company_name ?? ""}
        renderOption={(props, option: any, { _ }) => {
          return (
            <li {...props} key={option?.company_name}>
              {option?.company_name}
            </li>
          );
        }}
      />
      <RHFCustomSelect
        options={companySizeData}
        outerLabel="Company Size"
        placeholder="Select"
        name="companySize"
        startAdornment={<CompanySizeIcon sx={{ mr: 1 }} />}
      />
      <RHFCustomSelect
        options={countryData}
        outerLabel="Country"
        placeholder="Select"
        name="country"
        startAdornment={<CountryIcon sx={{ mr: 1 }} />}
      />
    </>
  );
}

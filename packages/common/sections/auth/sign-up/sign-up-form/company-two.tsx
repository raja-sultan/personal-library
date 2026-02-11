import React from "react";
import { RHFTextField } from "common/components";
import { CompanyNumberIcon, CountryIcon, LocationIcon } from "common/assets";

export function SignUpCompanyFormTwo(): JSX.Element {
  return (
    <>
      <RHFTextField
        outerLabel="Company No *"
        fullWidth
        name="companyNo"
        placeholder="Enter here"
        StartIcon={<CompanyNumberIcon sx={{ color: "neutral.500", mr: 1 }} />}
      />
      <RHFTextField
        outerLabel="Company Address *"
        fullWidth
        name="companyAddress"
        placeholder="Enter here"
        StartIcon={<LocationIcon sx={{ color: "neutral.500", mr: 1 }} />}
      />
      <RHFTextField
        outerLabel="Postal Code *"
        fullWidth
        name="postalCode"
        placeholder="Enter here"
        StartIcon={<CountryIcon sx={{ mr: 1 }} />}
      />
    </>
  );
}

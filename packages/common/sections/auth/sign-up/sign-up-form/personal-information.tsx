import React from "react";
import { FormEmailIcon, FormProfileIcon } from "common/assets";
import { RHFTextField, RHFTelInput } from "common/components";

export function SignUpFormPersonalInformation(): JSX.Element {
  return (
    <>
      <RHFTextField
        outerLabel="First Name *"
        fullWidth
        name="firstName"
        placeholder="Enter here"
        StartIcon={<FormProfileIcon sx={{ color: "neutral.500", mr: 1 }} />}
      />
      <RHFTextField
        fullWidth
        outerLabel="Last Name *"
        name="lastName"
        placeholder="Enter here"
        StartIcon={<FormProfileIcon sx={{ color: "neutral.500", mr: 1 }} />}
      />
      <RHFTextField
        outerLabel="Email *"
        fullWidth
        type="email"
        name="email"
        placeholder="Enter here"
        StartIcon={<FormEmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
      />
      <RHFTelInput
        outerLabel="Phone No *"
        name="contactNumber"
        fullWidth
        placeholder="Enter here"
      />
    </>
  );
}

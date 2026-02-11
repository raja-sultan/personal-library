"use client";

import { SignUpSection } from "common";
import React from "react";
import { useSignUpMutation } from "@services/auth-api";
import { useLazyGetCompaniesQuery } from "@services/companies/companies-api";

function SignUp(): JSX.Element {
  return (
    <SignUpSection
      useLazyGetCompaniesQuery={useLazyGetCompaniesQuery}
      useSignUpMutation={useSignUpMutation}
    />
  );
}

export default SignUp;

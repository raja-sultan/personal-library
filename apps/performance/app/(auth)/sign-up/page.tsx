"use client";

import { useSignUpMutation } from "@services/auth-api";
import { useLazyGetCompaniesQuery } from "@services/companies/companies-api";
import { SignUpSection } from "common";

function SignUp(): JSX.Element {
  return (
    <SignUpSection
      useLazyGetCompaniesQuery={useLazyGetCompaniesQuery}
      useSignUpMutation={useSignUpMutation}
    />
  );
}

export default SignUp;

import React, { useState } from "react";
import { HcmCard } from "./hcm-card";
import { Box } from "@mui/material";
import { SignUpForm } from "./sign-up-form";

export function SignUpSection({
  useLazyGetCompaniesQuery,
  useSignUpMutation,
}: any): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [hcmCardData, setHcmCardData] = useState([]);

  return (
    <Box>
      {showForm ? (
        <SignUpForm
          useLazyGetCompaniesQuery={useLazyGetCompaniesQuery}
          useSignUpMutation={useSignUpMutation}
          setShowForm={setShowForm}
          hcmCardData={hcmCardData}
        />
      ) : (
        <HcmCard setHcmCardData={setHcmCardData} setShowForm={setShowForm} />
      )}
    </Box>
  );
}

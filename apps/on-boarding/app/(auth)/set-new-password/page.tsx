"use client";
import React from "react";
import { SetNewPasswordSection } from "common";
import { useSetNewPasswordMutation } from "@services/auth-api";

function SetNewPassword(): JSX.Element {
  return (
    <SetNewPasswordSection
      useSetNewPasswordMutation={useSetNewPasswordMutation}
    />
  );
}

export default SetNewPassword;

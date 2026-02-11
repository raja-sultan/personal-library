"use client";
import React from "react";
import { ForgotPasswordSection } from "common";
import { useForgotPasswordMutation } from "@services/auth-api";

function ForgotPassword(): JSX.Element {
  return (
    <ForgotPasswordSection
      useForgotPasswordMutation={useForgotPasswordMutation}
    />
  );
}

export default ForgotPassword;

"use client";

import React from "react";
import { ResetPasswordSection } from "common";
import { useResetPasswordMutation } from "@services/auth-api";

function ResetPassword(): JSX.Element {
  return (
    <ResetPasswordSection useResetPasswordMutation={useResetPasswordMutation} />
  );
}

export default ResetPassword;

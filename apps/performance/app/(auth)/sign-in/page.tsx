"use client";
import React from "react";
import { SignInSection } from "common";
import { useLoginMutation } from "@services/auth-api";

function SignIn(): JSX.Element {
  return <SignInSection useLoginMutation={useLoginMutation} />;
}

export default SignIn;

"use client";

import { ChangePassword } from "common";
import { useChangePasswordMutation } from "@services/auth-api";

function MyProfile(): JSX.Element {
  return (
    <ChangePassword useChangePasswordMutation={useChangePasswordMutation} />
  );
}
export default MyProfile;

"use client";
import { UserDetailSection } from "@sections/configuration/user/user-details";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function UserDetail(): JSX.Element {
  const userId = useSearchParams().get("userId");
  const router = useRouter();
  if (!userId) {
    router.push("/configuration/user");
    toast.error("userId is not found");
    return <></>;
  }

  return <UserDetailSection />;
}

export default UserDetail;

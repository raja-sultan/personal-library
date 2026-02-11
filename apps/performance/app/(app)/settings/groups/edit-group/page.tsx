"use client";
import React from "react";
import { CreateGroupSection } from "@sections/settings/people/groups/create-groups";
import { useSearchParams } from "next/navigation";

function EditGroup(): JSX.Element {
  const params = useSearchParams();
  const id: string = params.get("id") || "";
  const title: string = params.get("GroupName") || "";

  return <CreateGroupSection title={title} userId={id} />;
}

export default EditGroup;
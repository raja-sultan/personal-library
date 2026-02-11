"use client";
import React from "react";
import { UpdatesView } from "@sections/my-team/updates/view";
import { useSearchParams } from "next/navigation";

function View(): JSX.Element {
  const params = useSearchParams();
  const id: string = params.get("id") || "";
  return <UpdatesView id={id} />;
}

export default View;

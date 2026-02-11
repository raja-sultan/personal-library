"use client";
import React from "react";
import { ViewDetails } from "@sections/compensation/view-details";
import { useSearchParams } from "next/navigation";

function Page(): JSX.Element {
  const params = useSearchParams();
  const id: string = params.get("id") || "";
  return <ViewDetails _id={id} />;
}

export default Page;

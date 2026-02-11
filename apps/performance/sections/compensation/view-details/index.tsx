"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { useRouter } from "next/navigation";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { MyResult } from "@sections/compensation/view-details/my-result";
import { TeamResult } from "@sections/compensation/view-details/team-result";
import { CompanyResult } from "@sections/compensation/view-details/company-result";

export function ViewDetails({ _id }): JSX.Element {
  const router = useRouter();
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: 2.4 } }}
        header
        cardHeader={{
          title: "Mid Year Compensation Cycle 2023",
          onBack: () => {
            router.push("/compensation");
          },
        }}
      />
      <CustomHeaderTableTabs
        tabsArray={["My Result", "Team Results", "Company Results"]}
      >
        <MyResult />
        <TeamResult _id={_id} />
        <CompanyResult />
      </CustomHeaderTableTabs>
    </>
  );
}

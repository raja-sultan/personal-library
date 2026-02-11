"use client";
import React from "react";

import { Box } from "@mui/material";
import HorizontalTabs from "@components/horizontal-tab";
import { useMyTeam } from "./use-my-team";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { useSearchParams } from "next/navigation";
import { MyFeedbackSection } from "@sections/feedback";
import { Overview } from "./overview";
import { TeamUpdates } from "./updates";
import { TeamCareer } from "./career";
import { OneOnOnesTeam } from "./one-on-ones";

export function MyTeamSection(): JSX.Element {
  const { tableData } = useMyTeam();
  const currentTab = useSearchParams().get('tab');

  return (
    <>
      <CustomHeaderTableTabs
        table={{
          primaryHeader: true,
          primaryHeaderProps: {
            title: 'My Team',
            description: 'See your team activities within the organization',
          },
          secondaryHeader: false,
          tableProps: tableData
        }}
      />
      <Box mb='24px' />
      <HorizontalTabs
        Index={Number(currentTab)}
        tabsArray={["Overview", "1 on 1s", "Updates", "Feedback", "Career"]}
      >
        <Overview />
        <OneOnOnesTeam />
        <TeamUpdates />
        <MyFeedbackSection
          filterByTeam={true}
          showDateRange
          hideTeamBtn
          tabArray={['All', 'Given', 'Pending']}
          backPath='/my-team?tab=3'
        />
        <TeamCareer />
      </HorizontalTabs>
    </>
  );
}

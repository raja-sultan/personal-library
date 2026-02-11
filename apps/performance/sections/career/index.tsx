"use client";

import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import GrowthAreasLayout from "./growth-areas";
import { CareerPlans } from "./plans";
import CareerVision from "./career-vision";
import { useState } from "react";
import {PERMISSIONS} from "@enums/permissions"

const { CAREER_PLAN, GROWTH_AREAS, CAREER_VISION } =
  PERMISSIONS.PERFORMANCE.MODULE.CAREER_OR_GROWTH;

export function Career(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<number | undefined>(undefined);
  const [skillId, setSkillId] = useState<any>(undefined);

  const handleTabChange = (val: number): void => {
    setCurrentTab(val === currentTab ? undefined : val);
  };

  const getSkillId = (id: string) => {
    setSkillId(id);
  };

  return (
    <CustomHeaderTableTabs
      headerProps={{
        title: "Career",
        description:
          "Manage growth areas for your career plan to monitor progress on assigned skills ",
      }}
      tabsArray={["Plans", "Growth Areas", "Career Vision"]}
      permissionsArray={[CAREER_PLAN, GROWTH_AREAS, CAREER_VISION]}
      currentTabValue={currentTab && currentTab}
    >
      <CareerPlans
        handleNextTab={() => {
          handleTabChange(1);
        }}
        handleClickFromParent={getSkillId}
      />
      <GrowthAreasLayout id={skillId} />
      <CareerVision />
    </CustomHeaderTableTabs>
  );
}

"use client"
import HorizontalTabs from "@components/horizontal-tab";
import { Box } from "@mui/material";
import React from "react";
import { useReports } from "./use-reports";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.REPORTS.REPORTS;

export function Reports(): JSX.Element {
  const { tabsComponentData } = useReports();
  return (
    <div>
      <HorizontalTabs
        tabsArray={["1-on-1s","Feedback","Career","Goals","Review","Compensation"]}
        permissionsArray={[PERMISSION.VIEW_1_ON_1s,PERMISSION.VIEW_FEEDBACK,PERMISSION.VIEW_CAREER,PERMISSION.VIEW_GOALS,PERMISSION.VIEW_REVIEW,PERMISSION.VIEW_COMPENSATION]}
      >
        {tabsComponentData?.map((item) => {
          return (
            <Box sx={{ mt: 1 }} key={item.id}>
              {item.comp}
            </Box>
          );
        })}
      </HorizontalTabs>
    </div>
  );
}

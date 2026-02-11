"use client";
import React from "react";
import { Box } from "@mui/material";
import { useViewProfile } from "./use-view-profile";
import HorizontalTabs from "@components/horizontal-tab";

interface tabsTypes {
  id: string;
  comp: React.ReactNode;
}

export function ViewProfile(): JSX.Element {
  const { TabsComponentData } = useViewProfile();

  return (
    <Box>
      <HorizontalTabs
        tabsArray={[
          "Overview",
          "1 on 1s",
          "Updates",
          "Feedback",
          "Career",
          "Reviews",
        ]}
      >
        {TabsComponentData.length &&
          TabsComponentData.map((item: tabsTypes) => {
            return (
              <Box sx={{ mt: 1 }} key={item.id}>
                {item.comp}
              </Box>
            );
          })}
      </HorizontalTabs>
    </Box>
  );
}

export default ViewProfile;

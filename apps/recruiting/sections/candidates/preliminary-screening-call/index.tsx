import { Box, useTheme } from "@mui/material";
import { CustomTabsIcon } from "common";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import React from "react";
import { PreliminaryScoreCardSection } from "./scorecard";
import { PreliminaryInterviewPrepSection } from "./interview-prep";
import { PreliminaryJobDetailsSection } from "./job-details";
import { PreliminaryResumeSection } from "./resume";

export function PreliminaryScreenCallSection(): JSX.Element {
  const theme = useTheme();
  return (
    <CustomTabsIcon
      tabRootSx={{
        color: theme.palette.text.primary,
      }}
      tabsNameArray={[
        {
          id: 1,
          title: "Interview Prep",

          icon: <ChecklistRoundedIcon />,
        },
        {
          id: 2,
          title: "Job Details",
          icon: <AssignmentOutlinedIcon />,
        },
        {
          id: 3,
          title: "Resume",
          icon: <DescriptionOutlinedIcon />,
        },
        {
          id: 4,
          title: "Scorecard",
          icon: <ChecklistRoundedIcon />,
        },
      ]}
    >
      <Box sx={{ p: 1 }}>
        <PreliminaryInterviewPrepSection />
      </Box>

      <Box sx={{ p: 1 }}>
        <PreliminaryJobDetailsSection />
      </Box>

      <Box sx={{ p: 1 }}>
        <PreliminaryResumeSection />
      </Box>

      <Box sx={{ p: 1 }}>
        <PreliminaryScoreCardSection />
      </Box>
    </CustomTabsIcon>
  );
}

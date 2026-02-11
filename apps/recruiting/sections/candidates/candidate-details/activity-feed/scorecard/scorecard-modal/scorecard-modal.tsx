import { Box, useTheme } from "@mui/material";
import { CustomModal, CustomTabsIcon } from "common";
import React from "react";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { ScoreCardModal } from "./scorecard";
import { InterviewPrepModal } from "./interview-prep";
import { JobDetailsModal } from "./job-details";
import { ResumeModal } from "./resume";

export function ScoreCardModalBox(props): JSX.Element {
  const { openScoreCardModal, setOpenScoreCardModal, edit } = props;
  const theme = useTheme();

  return (
    <CustomModal
      onClose={setOpenScoreCardModal}
      rootSx={{
        maxWidth: 1250,
        overflowY: "scroll",
        maxHeight: 900,
        bgcolor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.grey[50]
      }}
      acceptButtonLabel="Save"
      acceptButtonProps={{
        variant: "contained",
      }}
      cancelButtonsProps={{
        onClick: () => {
          setOpenScoreCardModal(false);
        },
      }}
      closeButtonProps={{
        onClick: () => {
          setOpenScoreCardModal(false);
        },
      }}
      isOpen={openScoreCardModal}
    >
      <CustomTabsIcon
        tabRootSx={{ color: theme.palette.text.primary }}
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
          <InterviewPrepModal />
        </Box>

        <Box sx={{ p: 1 }}>
          <JobDetailsModal />
        </Box>

        <Box sx={{ p: 1 }}>
          <ResumeModal />
        </Box>

        <Box sx={{ p: 1 }}>
          <ScoreCardModal edit={edit} />
        </Box>
      </CustomTabsIcon>
    </CustomModal>
  );
}

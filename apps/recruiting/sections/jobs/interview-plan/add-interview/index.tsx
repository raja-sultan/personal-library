import { Typography, Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { addStageBox } from "../style";
import { WarningPrompt } from "common";
import { Edit, Delete } from "@assets/common";

export function AddInterview(props: any): JSX.Element {
  const theme = useTheme();
  const {
    key,
    interviewName,
    setOpenInterviewModal,
    setInterviewDetails,
    setIsEditOrSave,
    ele,
    deleteInterview,
  } = props;
  return (
    <React.Fragment key={key}>
      <Box mb={2} sx={addStageBox(theme)}>
        <Typography variant="body2" px={2} py={1}>
          {interviewName}
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <IconButton>
            <Edit
              onClick={() => {
                setOpenInterviewModal(true);
                setInterviewDetails(ele);
                setIsEditOrSave("Edit");
              }}
            />
          </IconButton>

          <WarningPrompt
            mainColor="error.main"
            heading="Delete Interview"
            subTitle="Are you sure you want to delete this Interview?"
            modelOpenLabel={
              <IconButton>
                <Delete />
              </IconButton>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                deleteInterview(ele);
              },
            }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}

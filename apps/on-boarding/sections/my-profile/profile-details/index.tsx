import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import React from "react";
import Documents from "./documents";
import { FeedbackTable } from "./feedback";
import { Box } from "@mui/material";
import ProfileTab from "./profile";
import { TasksSection } from "./tasks";

function ProfileDetails({ data }: any): JSX.Element {
  return (
    <Box sx={{ position: "relative", pt: 0.5 }}>
      <CustomHeaderTableTabs
        tabsArray={["Profile", "Documents", "Feedback", "Tasks"]}
      >
        <ProfileTab data={data} />
        <Documents />
        <FeedbackTable />
        <TasksSection />
      </CustomHeaderTableTabs>
    </Box>
  );
}

export default ProfileDetails;

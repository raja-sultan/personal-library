import { Box } from "@mui/material";
import { CustomTabs } from "common";
import React from "react";
import { AllTask } from "./all-task";
import { MyTask } from "./my-task";

export function Tasks(): React.JSX.Element {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <CustomTabs
        maxWidth={255}
        tabsNameArray={["My Task", "All Task"]}
        tabRootSx={{
          "&.MuiButtonBase-root": {
            maxWidth: 600,
            marginLeft: 1,
          },
        }}
        tabsRootSx={{
          border: "unset !important",
        }}
      >
        <MyTask />
        <AllTask />
      </CustomTabs>
    </Box>
  );
}

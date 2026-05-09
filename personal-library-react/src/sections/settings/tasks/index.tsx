import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { AddTaskModal } from "./add-task-modal";
import { CustomTabs } from "common";
import { AllTasksTable } from "./all";
import { BuildRelation } from "./build-relation";
import { JobTraining } from "./job-training";
import { KnowCompany } from "./know-company";
import { Logistics } from "./logistics";

export function TasksSection(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Tasks</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Task
        </Button>
      </Box>
      <Box my={2}>
        <CustomTabs
          maxWidth={720}
          tabRootSx={{
            "&.MuiButtonBase-root": {
              maxWidth: 600,
              marginLeft: 2,
            },
          }}
          tabsNameArray={[
            "All",
            "Build Relationships",
            "job Training",
            "Know the Company",
            "Logistics",
          ]}
        >
          <AllTasksTable />
          <BuildRelation />
          <JobTraining />
          <KnowCompany />
          <Logistics />
        </CustomTabs>
      </Box>
      {open && <AddTaskModal open={open} setOpen={setOpen} />}
    </>
  );
}

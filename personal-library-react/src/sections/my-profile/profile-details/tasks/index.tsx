import { Box, Button } from "@mui/material";
import { TasksTable } from "./tasks-table";
import { useState } from "react";
import CreateTaskModal from "./create-task";

export function TasksSection(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          mb: { xs: 2, md: 0 },
          display: { xs: "block", md: "flex" },
          justifyContent: { xs: "start", md: "end" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Button
          sx={{
            position: { xs: "static", md: "absolute" },
            top: 0,
          }}
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create Task
        </Button>
      </Box>
      {/* Tasks Component */}
      <TasksTable />
      {open && <CreateTaskModal open={open} setOpen={setOpen} />}
    </>
  );
}

import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { NewHiringTable } from "./new-hiring-table";
import Link from "next/link";

export function NewHiringSection(): JSX.Element {
  // Api Call Here
  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">New Hires</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 0.3, color: "text.secondary" }}
          >
            Hire people to grow to grow your team and deliver better
          </Typography>
        </Box>
        <Link href="/new-hiring/add-new-hire">
          <Button variant="contained">Add New Hire</Button>
        </Link>
      </Paper>
      {/* New Hiring Table */},
      <NewHiringTable />
    </>
  );
}

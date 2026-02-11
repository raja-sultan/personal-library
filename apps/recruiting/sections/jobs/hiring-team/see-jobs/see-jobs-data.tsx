import { Box, Typography } from "@mui/material";
import type { Columns, seeJobReturnType } from "./see-jobs-types";

export function seeJobsTable(): seeJobReturnType {
  const columns: Columns[] = [
    {
      accessorFn: (row) => row.username,
      id: "username",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue() ?? "---"}
        </Typography>
      ),
      header: () => (
        <Box width="100%" display="flex" justifyContent="flex-start">
          <Typography variant="body1">Name</Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.email,
      id: "email",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue() ?? "---"}
        </Typography>
      ),
      header: () => (
        <Box width="100%" display="flex" justifyContent="flex-start">
          <Typography variant="body1">Email Address</Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.type,
      id: "type",
      cell: (info) => (
        <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
          {info.getValue() ?? "---"}
        </Typography>
      ),
      header: () => (
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="body1" className="asd">
            Permission level
          </Typography>
        </Box>
      ),
    },
  ];

  return {
    columns,
  };
}

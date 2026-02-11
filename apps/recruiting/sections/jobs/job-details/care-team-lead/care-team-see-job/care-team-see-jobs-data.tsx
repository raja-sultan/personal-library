import { Box, Typography } from "@mui/material";
import type {
  Columns,
  careTeamSeeJobReturnType,
} from "./care-team-see-jobs-types";

export function CareTeamSeeJobsTable(): careTeamSeeJobReturnType {
  const columns: Columns[] = [
    {
      accessorFn: (row) => row.userName,
      id: "userName",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue()}
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
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          <Typography variant="body1">Email Address</Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.permissionLevel,
      id: "permissionLevel",
      cell: (info) => (
        <Typography variant="body1">
          {info.getValue() ?? "Jobs Admin: Standard"}
        </Typography>
      ),
      header: () => (
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="body1">Permission level</Typography>
        </Box>
      ),
    },
  ];

  return {
    columns,
  };
}

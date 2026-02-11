import { Box, Typography } from "@mui/material";
import { TableAction } from "common";
import { AgenciesModelFrom } from "./agencies-form";
import type { Columns, agenciesReturnType } from "./agencies-types";

export const AgenciesArray = [
  {
    Id: 1,
    agencies: "ZipRecruiter",
    recruiter: "Waleed Saleh",
    candidates: 10,
    active: 0,
    hired: 0,
  },
  {
    Id: 2,
    agencies: "ZipRecruiter",
    recruiter: "Waleed Saleh",
    candidates: 10,
    active: 0,
    hired: 0,
  },
];

export function agenciesTable(): agenciesReturnType {
  const columns: Columns[] = [
    {
      accessorFn: (row) => row.agencies,
      id: "agencies",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <Typography variant="body1">Agency / Recruiter</Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row.recruiter,
      id: "recruiter",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <Typography variant="body1">Recruiter</Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row.candidates,
      id: "candidates",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <Typography variant="body1">Candidates</Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row.active,
      id: "active",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <Typography variant="body1">Active</Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row.hired,
      id: "hired",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <Typography variant="body1">Hired</Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.id,
      id: "actions",
      cell: (info) => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          <TableAction>
            <AgenciesModelFrom data={info?.row.original} />
          </TableAction>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];

  return {
    columns,
  };
}

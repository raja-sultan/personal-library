import { Box } from "@mui/material";

export const openingsListTableData = [
  {
    id: 1,
    openingsID: "18 - 2",
    status: "Open",
    openDate: "December 03, 2022",
    targetStartDate: "December 10, 2022",
    closeDate: "December 23, 2022",
    closeReason: "Not Defined",
  },
];

export const openingsListTable = (): any => {
  const openingsListColumns = [
    {
      accessorFn: (row: any) => row.openingsID,
      id: "openingsID",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Openings ID
        </Box>
      ),
    },

    {
      accessorFn: (row: any) => row.status,
      id: "status",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Status
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.openDate,
      id: "openDate",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Open Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.targetStartDate,
      id: "targetStartDate",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Target Start Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.closeDate,
      id: "closeDate",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Close Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.closeReason,
      id: "closeReason",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Close Reason
        </Box>
      ),
    },
  ];
  return {
    openingsListColumns,
  };
};

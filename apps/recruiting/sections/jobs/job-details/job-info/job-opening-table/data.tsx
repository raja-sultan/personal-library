import { Box, useTheme } from "@mui/material";
import { CustomChip } from "common";
import dayjs from "dayjs";

export const SeeJobsTable = () => {
  const theme: any = useTheme();

  const SeeJobsColumns = [
    {
      accessorFn: (row: any) => row.openingId,
      id: "_id",
      cell: (info: any) => info.getValue(),
      header: () => <span>Opening Id</span>,
    },
    {
      accessorFn: (row: any) => row.status,
      id: "status",
      cell: (info: any) => (
        <Box>
          <CustomChip
            variant="success"
            ChipProps={{ label: info.getValue() }}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
    },
    {
      accessorFn: (row: any) => row.openDate,
      id: "openDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => <span>Open Date</span>,
    },
    {
      accessorFn: (row: any) => row.targetStartDate,
      id: "targetStartDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => <span>Target Start Date</span>,
    },
    {
      accessorFn: (row: any) => row.closeDate,
      id: "closeDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => <span>Close Date</span>,
    },
    {
      accessorFn: (row: any) => row?.closeReason[0]?.closeReason,
      id: "closeReasonId",
      cell: (info: any) => info.getValue() ?? "---",
      header: () => <span>Close Reason</span>,
    },
  ];

  return {
    theme,
    SeeJobsColumns,
  };
};

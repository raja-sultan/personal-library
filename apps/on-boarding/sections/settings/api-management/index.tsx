import React from "react";

import { Box, Typography, Button, Paper } from "@mui/material";
import { CustomTable } from "common";
import AddApiManagementModal from "./add-api-management-modal";

export function ApiManagementSection(): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row.Name ?? "-",
      id: "Name",
      cell: () => (
        <Box>
          {/* <UpdateCriteriaModal label={info.getValue() ?? "-"} /> */}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.accessKey ?? "-",
      id: "accessKey",
      cell: (info: any) => info.getValue(),
      header: () => <span>Access Key</span>,
      isSortable: false,
    },
  ];
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" color="neutral">
          API Management
        </Typography>
        <Box ml="auto">
          <AddApiManagementModal />
        </Box>
      </Box>
      <Paper variant="elevation" elevation={2}>
        <Box sx={{ py: 1, px: 1, pb: 0.5 }}>
          <CustomTable
            data={[]}
            columns={columns}
            isLoading={false}
            isFetching={false}
            isError={false}
            isSuccess
            isPagination={false}
            showSerialNo={false}
          />
        </Box>
      </Paper>
    </Box>
  );
}

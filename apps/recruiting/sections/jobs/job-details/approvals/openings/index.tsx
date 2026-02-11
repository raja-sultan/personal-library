import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomTable } from "common";
import dayjs from "dayjs";
import { useGetOpeningsApprovalsDetailsQuery } from "@services/jobs/job-details/approvals/opening-approvals-api";
import { useSearchParams } from "next/navigation";
import { ManageOpeningModal } from "./manage-opening-model/manage-opening-modal";

export function OpeningsApproval(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [veiwAndManageInfoCon, setViewAndManageInfoCon] = useState({
    viewReportModal: false,
    manageOpeningModal: false,
  });

  // Table Data
  const openingsListColumns = [
    {
      accessorFn: (row: any) => row.openingId,
      id: "openingsID",
      cell: (info: any) => info.getValue(),
      header: () => <span>Openings ID</span>,
    },

    {
      accessorFn: (row: any) => row.status,
      id: "status",
      cell: (info: any) => info.getValue(),
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
      accessorFn: (row: any) => row.closeReason,
      id: "closeReason",
      cell: (info: any) => {
        if (Array.isArray(info.getValue())) {
          return info.getValue().map((row) => row.closeReason);
        }
        return "-";
      },
      header: () => <span>Close Reason</span>,
    },
  ];

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetOpeningsApprovalsDetailsQuery({
      jobId,
    });

  const viewManageModelToggle = () => {
    setViewAndManageInfoCon((pre) => ({
      ...pre,
      manageOpeningModal: !veiwAndManageInfoCon?.manageOpeningModal,
    }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Openings</Typography>
        <Button onClick={viewManageModelToggle}>Manage Openings</Button>
      </Box>
      <CustomTable
        data={data?.data?.jobInfo?.openings}
        columns={openingsListColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination
        isSuccess={isSuccess}
        showSerialNo
      />
      <ManageOpeningModal
        isOpen={veiwAndManageInfoCon?.manageOpeningModal}
        closeModel={viewManageModelToggle}
      />
    </Box>
  );
}

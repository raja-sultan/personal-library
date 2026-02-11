import { Box, Typography } from "@mui/material";
import { CustomTable } from "common";
import { ApprovalsHistoryModals } from "./common-modal";
import dayjs from "dayjs";

export function OfferApprovalsHistory({
  data,
  isError,
  isFetching,
  isLoading,
  isSuccess,
}: any): JSX.Element {
  const offerApprovalHistoryListColumns = [
    {
      accessorFn: (row: any) => row?.approvalType ?? "Offer Approval",
      id: "approvalType",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Approval Type
        </Box>
      ),
    },

    {
      accessorFn: (row: any) => row?.requestedByFullName ?? "-",
      id: "requestedByFullName",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Requested By
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.requestedTo ?? "-",
      id: "requestedTo",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Approved By
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.openingId ?? "-",
      id: "openingId",
      cell: (info: any) => {
        return (
          <Box display="flex" justifyContent="center">
            {info?.row?.original?.openingInfo?.map((item) => (
              <Box key={item._id}>{item.openingId}</Box>
            ))}
          </Box>
        );
      },
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Opening ID
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.requestedDate ?? "-",
      id: "requestedDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Requested Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.approvalDate ?? "-",
      id: "approvalDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Approval Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.requestStatus ?? "-",
      id: "requestStatus",
      cell: (info: any) => {
        return (
          <Box>
            <ApprovalsHistoryModals
              apiData={info?.row?.original}
              requestStatus={info?.getValue()}
            />
          </Box>
        );
      },
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Status
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Offer Approvals History
      </Typography>

      <CustomTable
        data={data?.data}
        columns={offerApprovalHistoryListColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination={false}
        isSuccess={isSuccess}
      />
    </Box>
  );
}

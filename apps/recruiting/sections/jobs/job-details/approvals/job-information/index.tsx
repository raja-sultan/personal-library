import { Button, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { CustomTable } from "common";
import { ManageJobsModal } from "./manage-jobs-modal";
import { LeaveNoteModal } from "./leave-note-modal";
import {
  useDepartmentListQuery,
  useGetJobInformationApprovalsQuery,
  useGetJobOfficeListQuery,
} from "@services/jobs/job-details/approvals/job-info-approvals-api";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

export function JobInformation(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openLeaveCategory, setOpenLeaveCategory] = useState<boolean>(false);
  const [viewText, setViewText] = useState<string>("");
  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetJobInformationApprovalsQuery({
      jobId,
    });

  const { data: departmentList } = useDepartmentListQuery({});
  const { data: officeListApiData } = useGetJobOfficeListQuery({});

  const jobInformationListColumns = [
    {
      accessorFn: (row: any) => row?.requisitionId,
      id: "requisitionId",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          Requisition ID
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.department?.departmentName ?? "-",
      id: "department",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          Department
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.office?.officeName ?? "-",
      id: "office",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          Office
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.employmentType ?? "-",
      id: "employmentType ",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="center">
          Employment Type
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.approvalDate ?? "-",
      id: "approvalDate",
      cell: (info: any) =>
        dayjs(info.getValue()).format("MM/DD/YYYY") ? (
          <Box textAlign="center">---</Box>
        ) : (
          dayjs(info.getValue()).format("MM/DD/YYYY")
        ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Approval Date
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.note ?? "--",
      id: "Note",
      cell: (info: any) => {
        return (
          <Button
            sx={{ display: "flex", justifyContent: "flex-start" }}
            onClick={() => {
              setViewText(info?.row?.original.note);
              setOpenLeaveCategory(true);
            }}
          >
            {info?.row?.original.note ? "View Note" : "Leave a Note"}
          </Button>
        );
      },
      header: (row: any) => {
        row;
        return (
          <>
            <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
              Note
            </Box>

            <LeaveNoteModal
              viewText={viewText}
              openLeaveCategory={openLeaveCategory}
              setOpenLeaveCategory={setOpenLeaveCategory}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Job Information</Typography>
        <Button
          onClick={() => {
            setOpenCategory(true);
          }}
        >
          Manage Jobs
        </Button>
      </Box>
      <CustomTable
        data={[data?.data]}
        columns={jobInformationListColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination={false}
        isSuccess={isSuccess}
      />

      <ManageJobsModal
        manageJobData={data?.data}
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        departmentList={departmentList}
        officeListApiData={officeListApiData}
      />
    </Box>
  );
}

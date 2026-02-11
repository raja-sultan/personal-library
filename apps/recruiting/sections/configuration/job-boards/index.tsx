import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {
  Button,
  Chip,
  MenuItem,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { CustomTable, TableIconActions } from "common";
import React, { useState } from "react";
import { CreateJobModal } from "./create-job-modal";
import { TrackingLinkModal } from "./tracking-link-modal";
import {
  useGetJobBoardsQuery,
  usePatchJobBoardsMutation,
} from "@services/configuration/job-boards/job-boards-api";
import toast from "react-hot-toast";
import Link from "next/link";

export function JobBoardsSection(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(false);
  const [jobBoardId, setJobBoardId] = useState(null);
  const [jobBoardUrl, setJobBoardUrl] = useState(null);

  const theme: any = useTheme();

  //Job Boards GET List API
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetJobBoardsQuery({});

  //Patch api for job boards
  const [patchIsLive] = usePatchJobBoardsMutation();

  const columns = [
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      header: () => <Box>Status</Box>,
      cell: (info: any) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2">Off</Typography>
            <Switch
              sx={{ mx: 1 }}
              checked={info?.row?.original?.isLive}
              size="medium"
              onChange={async () => {
                try {
                  const res: any = await patchIsLive({
                    jobBoardId: info?.row?.original?._id,
                    body: {
                      isLive: !info?.row?.original?.isLive,
                    },
                  }).unwrap();
                  toast.success(res?.message || `Status Updated Successfully!`);
                } catch (error: any) {
                  const errMsg = error?.data?.message;
                  toast.error(errMsg ?? "Something Went Wrong!");
                }
              }}
            />
            <Typography variant="subtitle2">Live</Typography>
          </Box>
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.name ?? "-",
      id: "name",
      header: () => <Box>Board Name</Box>,
      cell: (info: any) => (
        <Button
          sx={{
            textDecoration: "none",
            color: "text.secondary",
          }}
          onClick={() => {
            window.open(
              info?.row?.original?.type === "internal"
                ? `/careers?companyName=${info?.row?.original?.domain}`
                : `${info?.row?.original?.url}`,
              "_blank"
            );
          }}
        >
          {info.getValue()}
          {info?.row?.original?.type === "internal" && (
            <Chip
              size="small"
              label={info?.row?.original?.type}
              sx={{
                backgroundColor: "warning.lightest",
                borderRadius: "4px",
                ml: 1,
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "11px",
                color:
                  theme.palette.mode === "dark"
                    ? "text.secondary"
                    : "text.primary",
              }}
              variant="filled"
            />
          )}
        </Button>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobPostCount ?? "-",
      id: "jobPostCount",
      header: () => <Box>Job Posts</Box>,
      cell: (info: any) => (
        <Link
          href={`/configuration/job-boards/job-posts/?jobBoardId=${info?.row?.original?._id}`}
          style={{
            pointerEvents:
              info?.row?.original?.jobPostCount === 0 ? "none" : "auto",
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          {info.getValue()}
        </Link>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.Action,
      id: "Action",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <TableIconActions icon={<TableActionsIcon />}>
            <MenuItem
              onClick={() => {
                setOpen(true);
                setJobBoardId(info?.row?.original?._id);
              }}
            >
              Update
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLink(true);
                setJobBoardUrl(info?.row?.original?._id);
              }}
            >
              Tracking Link
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.open(
                  info?.row?.original?.type === "internal"
                    ? `/careers?companyName=${info?.row?.original?.domain}`
                    : `${info?.row?.original?.url}`,
                  "_blank"
                );
              }}
            >
              View Live
            </MenuItem>
          </TableIconActions>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];
  return (
    <>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Job Boards
        </Typography>
        <Box>
          <Button
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={() => {
              setOpen(true);
            }}
            size="medium"
            variant="outlined"
          >
            Create a Job Board
          </Button>
        </Box>
      </Box>
      <CustomTable
        data={data?.data}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination
        isSuccess={isSuccess}
        showSerialNo
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        // onPageChange={(onPageData: any) => {
        //   setParams({
        //     page: onPageData,
        //     offset: (onPageData - 1) * 10,
        //   });
        // }}
      />
      {open && (
        <CreateJobModal
          open={open}
          setOpen={setOpen}
          jobBoardId={jobBoardId}
          setJobBoardId={setJobBoardId}
        />
      )}
      {/* Tracking Link Modal */}
      {jobBoardUrl && (
        <TrackingLinkModal
          link={link}
          setLink={setLink}
          jobBoardUrl={jobBoardUrl}
          setJobBoardUrl={setJobBoardUrl}
        />
      )}
    </>
  );
}

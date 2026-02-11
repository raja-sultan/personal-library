import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Switch,
  MenuItem,
  Card,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import { CustomTable, TableIconActions } from "common";
import { CopyIcon, LiveViewIcon } from "@assets/icons";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetJobPostDataApiQuery,
  useUpdateJobPostStatusByIdMutation,
} from "@services/jobs/create-jobs/job-post/job-post-api";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { TrackingLinkModal } from "./tracking-link-modal";
import Link from "next/link";
import { JobDetailsHeader } from "../job-details-header";

export function JobPostSetup({ isHideColumn }: any): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const { data, isError } = useGetJobPostDataApiQuery({ jobId });
  const [updateData] = useUpdateJobPostStatusByIdMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [jobBoardUrl, setJobBoardUrl] = useState(null);

  const firstJobBoardId = data?.data?.[0]?.jobBoard?._id;

  useEffect(() => {
    if (isError) {
      toast.error("Something Went Wrong!");
      router.push(`/view-jobs`);
    }
  }, [isError, router]);

  const columns = [
    {
      accessorFn: (row: any) => row?.status,
      id: "Status",
      cell: (info: any) => (
        <Switch
          checked={info?.row?.original?.isLive}
          size="medium"
          onChange={async () => {
            try {
              const res: any = await updateData({
                jobPostId: info?.row?.original?._id,
                status: !info?.row?.original?.isLive,
              }).unwrap();
              toast.success(res?.message || `Status Update Successfully!`);
            } catch (error: any) {
              const errMsg = error?.data?.message;
              toast.error(errMsg ?? "Something Went Wrong!");
            }
          }}
        />
      ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.postDetails?.jobName ?? "-",
      id: "jobPost",
      cell: (info: any) => <Stack spacing={2}>{info.getValue()}</Stack>,
      header: () => <span>Job Post</span>,
    },
    {
      accessorFn: (row: any) => row.tracking,
      id: "tracking",
      cell: (info: any) => {
        return (
          <Box sx={{ cursor: "pointer" }}>
            <IconButton
              onClick={() => {
                setOpen(true);
                setJobBoardUrl(info?.row?.original?.jobBoardId);
              }}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        );
      },
      header: () => <span>Tracking Link</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.live,
      id: "liveView",
      cell: (info: any) => (
        <Box sx={{ cursor: "pointer" }}>
          <IconButton
            onClick={() => {
              window.open(
                info?.row?.original?.jobBoard?.type === "internal"
                  ? `/careers?companyName=${info?.row?.original?.jobBoard?.domain}`
                  : `${info?.row?.original?.jobBoard?.url}`,
                "_blank"
              );
            }}
          >
            <LiveViewIcon />
          </IconButton>
        </Box>
      ),
      header: () => <span>Live View</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.createdAt ?? "-",
      id: "firstPublished",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("MMMM DD, YYYY")}</Box>;
      },
      header: () => <span>First Published</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.jobBoard?.type ?? "-",
      id: "jobBoard",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Job Board</span>,
      isSortable: false,
    },

    {
      id: "Actions",
      cell: (info: any) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              router.push(
                `/jobs/job-details/job-post?jobPostId=${info?.row?.original?._id}&jobId=${jobId}&action=edit`
              );
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(
                `/jobs/job-details/job-post?jobPostId=${info?.row?.original?._id}&jobId=${jobId}&action=duplicate`
              );
            }}
          >
            Duplicate
          </MenuItem>
          <MenuItem>Primary</MenuItem>
        </TableIconActions>
      ),
      header: () => <span>Actions</span>,
    },
  ];
  function filterColumns(columnsData: any[]): any {
    const filteredColumns = columnsData.filter((item) =>
      isHideColumn
        ? item.id !== "trackingLink" &&
          item?.id !== "liveView" &&
          item.id !== "applicationRules"
        : item
    );
    return filteredColumns;
  }
  const renderSkeleton = () => (
    <Stack spacing={3}>
      {/* Replace this with your desired skeleton loading structure */}
      <Stack spacing={3} direction="row" justifyContent="flex-end">
        <Skeleton variant="rounded" width={200} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Stack>

      <Skeleton height={250} />
    </Stack>
  );
  // /jobs/job-details?jobId=6629f1524311da845316668d
  return data ? (
    <Box>
      <JobDetailsHeader mainTitle="Job Posts" />
      <Stack>
        {!isHideColumn && (
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "start", sm: "center" },
              gap: 2,
              justifyContent: "end",
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Box>
              {!data?.data || Object.keys(data.data).length === 0 ? (
                <Button variant="outlined" disabled>
                  See Job Boards
                </Button>
              ) : (
                <Link
                  href={`/configuration/job-boards/job-posts/?jobBoardId=${firstJobBoardId}`}
                >
                  <Button variant="outlined">See Job Boards</Button>
                </Link>
              )}
            </Box>
            <Link href={`job-post?jobId=${jobId}&action=add`}>
              <Button variant="contained">Add job Post</Button>
            </Link>
          </Box>
        )}
        <Card sx={{ background: "white", borderRadius: 1, p: 2, mt: 3 }}>
          <CustomTable
            data={data?.data}
            columns={filterColumns(columns)}
            isLoading={false}
            isFetching={false}
            isError={false}
            isPagination={false}
            isSuccess
          />
        </Card>
        {open && (
          <TrackingLinkModal
            open={open}
            setOpen={setOpen}
            jobBoardUrl={jobBoardUrl}
            setJobBoardUrl={setJobBoardUrl}
          />
        )}
      </Stack>
    </Box>
  ) : (
    renderSkeleton()
  );
}
export * from "./add-job-post";

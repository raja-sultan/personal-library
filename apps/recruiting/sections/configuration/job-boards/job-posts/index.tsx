import { Button, IconButton, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomTable } from "common";
import React, { useState } from "react";
import {
  useGetJobPostsByIdQuery,
  usePatchJobPostUpdateMutation,
} from "@services/configuration/job-boards/job-boards-api";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import toast from "react-hot-toast";
//import toast from "react-hot-toast";

export function JobPostsSection(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobBoardId = searchParams.get("jobBoardId");

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
    search: "",
  });

  const [patchJobStatus] = usePatchJobPostUpdateMutation();

  //GET LIST API FOR JOB POSTS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetJobPostsByIdQuery({
      jobBoardId,
      params: {
        limit: 10,
        offset: params.offset,
      },
    });

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
                  const res: any = await patchJobStatus({
                    jobPostId: info?.row?.original?._id,
                    status: !info?.row?.original?.isLive,
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
      accessorFn: (row: any) => row?.postDetails?.jobName ?? "-",
      id: "postName",
      header: () => <Box>Post Name</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.postDetails?.location ?? "-",
      id: "location",
      header: () => <Box>Location</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.createdAt ?? "-",
      id: "firstPublication",
      header: () => <Box>First Published</Box>,
      cell: (info: any) => {
        return (
          <Box>{dayjs(info.getValue()).format("MMMM DD, YYYY") ?? "-"}</Box>
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.Action,
      id: "Action",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <IconButton
            onClick={() => {
              window.open(
                `/careers/job-details?jobPostId=${info?.row?.original?._id}`,
                "_blank"
              );
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];
  return (
    <>
      <Box mb={3}>
        <Button
          sx={{ p: 0, mb: 1.5 }}
          size="small"
          onClick={() => {
            router.push("/configuration/job-boards");
          }}
        >
          Back to Job Boards
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Job Posts
        </Typography>
      </Box>
      <CustomTable
        data={data?.data?.jobPosts}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination
        isSuccess={isSuccess}
        showSerialNo
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
    </>
  );
}

import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { useGetJobPostsDataApiQuery } from "@services/jobs/job-details/job-setup/job-overview/job-posts/job-posts-api";
import { CustomTable } from "common";
import { useSearchParams } from "next/navigation";
import { EditJobPostsModal } from "../edit-job-posts-modal";

export function JobPosts(): JSX.Element {
  const id = useSearchParams();

  const { data } = useGetJobPostsDataApiQuery({
    jobId: id.get("jobId"),
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.isLive,
      id: "isLive",
      cell: (info: any) => <Box>{info.getValue() ? "Open" : "Close"}</Box>,
      header: () => <span>Job Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.postDetails?.jobName ?? "-",
      id: "jobPost",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Job Post</span>,
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
      cell: (info: any) => <EditJobPostsModal dataOfJobPosts={info.row.original} />,
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box>
      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f2f4f7",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Job Posts
            </Typography>
          </Box>

          <CustomTable
            data={data?.data}
            columns={columns}
            isLoading={false}
            isFetching={false}
            isError={false}
            isPagination={false}
            isSuccess
          />
        </CardContent>
      </Card>
    </Box>
  );
}

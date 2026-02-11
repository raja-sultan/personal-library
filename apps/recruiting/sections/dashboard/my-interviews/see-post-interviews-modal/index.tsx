import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useGetDashboardMyInterviewsQuery } from "@services/dashboard/company-goals-api";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

export function SeePostInterviewsFormModal({
  postInterviews,
  setPostInterviews,
}: {
  postInterviews: boolean;
  setPostInterviews: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  // const candidateId = searchParams.get("candidateId");
  // const interviewId = searchParams.get("interviewId");
  const stageId = searchParams.get("stageId");
  const { data } = useGetDashboardMyInterviewsQuery({ today: false });
  console.log("🚀 ~ data.............................:", data);

  return (
    <CustomModal
      onClose={setPostInterviews}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750 },
      }}
      headerLabel="Past Interview on Open Jobs"
      closeButtonProps={{
        onClick: () => {
          setPostInterviews(false);
        },
      }}
      isOpen={postInterviews}
    >
      {data?.data?.map((item: any) => {
        return (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.5,
              px: 1,
              "&:hover": { backgroundColor: "primary.light" },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {item?.name ?? "---"}
            </Typography>
            <Typography variant="body2" color="#667085">
              {`Today, ${dayjs(item?.startTime).format("h:mm a")} - ${dayjs(
                item?.endTime
              ).format("h:mm a")}`}
            </Typography>
            {/* <Link href={`/interview-details?jobId=${jobId}&candidateId=${stageId}`}> */}
            <Link
              href={`/interview-details?jobId=${item?.JobInfo?._id}&candidateId=${item?.candidateInfo?._id}&stageId=${item?.interviewInfo?.stageId}&interviewId=${item?._id}`}
            >
              <Typography sx={{ fontWeight: 600 }}>See Scorecard</Typography>
            </Link>
          </Box>
        );
      })}
    </CustomModal>
  );
}

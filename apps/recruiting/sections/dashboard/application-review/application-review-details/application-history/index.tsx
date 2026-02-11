import { Button, Card, Grid, Box, Typography, useTheme } from "@mui/material";
// import Link from "next/link";
import React from "react";
import type { Theme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dayjs from "dayjs";
// import { useRouter, useSearchParams } from "next/navigation";

function getIconBasedOnStatus(rejected: string, theme: Theme): any {
  switch (rejected) {
    case "Approved":
      return (
        <Box sx={{ mr: 2 }} display="flex" alignItems="centers" gap={0.5}>
          <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
          <Typography variant="subtitle2" color="Primary" fontWeight={600}>
            Approved
          </Typography>
        </Box>
      );

    case "Pending":
      return (
        <Box sx={{ mr: 2 }} display="flex" alignItems="centers" gap={0.5}>
          <PendingIcon sx={{ color: theme.palette.warning.main }} />
          <Typography variant="subtitle2" color="warning" fontWeight={600}>
            Pending
          </Typography>
        </Box>
      );

    case "Rejected":
      return (
        <Box display="flex" alignItems="centers" gap={0.5}>
          <CancelIcon sx={{ color: theme.palette.error.main }} />
          <Typography variant="subtitle2" color="error" fontWeight={600}>
            Rejected
          </Typography>
        </Box>
      );

    default:
      return (
        <Box sx={{ mr: 2 }} display="flex" alignItems="centers" gap={0.2}>
          <InfoOutlinedIcon sx={{ color: theme.palette.info.main }} />
          <Typography variant="subtitle2" color="Primary" fontWeight={600}>
            {status}
          </Typography>
        </Box>
      );
  }
}

export function ApplicationHistorySection({ candidateData }): JSX.Element {
  console.log(
    "🚀 ~ ApplicationHistorySection ~ candidateData:",
    candidateData?.hiringTeam?.responsiblePersons?.recruiters
  );
  const theme = useTheme();
  // const router = useRouter();

  // const jobId = useSearchParams("jobId");
  // const candidateId = useSearchParams("candidateID");

  return (
    <>
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Application History
      </Typography>
      <Card sx={{ p: 2, mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Box
              sx={{
                mr: 0.8,
                height: "10px",
                width: "10px",
                backgroundColor: "#7A5AF8",
                borderRadius: "50%",
              }}
            />
            {candidateData?.job?.jobInfo?.jobName}
          </Box>
        </Typography>
        <Grid container>
          <Grid item xs={12} md={2} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Applied
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {dayjs(candidateData?.createdAt).format("MM/DD/YYYY") ?? "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Recruiter
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {candidateData?.job?.hiringTeam?.responsiblePersons?.recruiters?.map(
                (item: any) => <Box key={item.id}>{item.userName}</Box>
              ) ?? "---"}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} md={8}>
          {accordionData.map((item: any) => (
            <CustomAccordion title={item.title} key={item.id}>
              {item.component}
            </CustomAccordion>
          ))}
        </Grid> */}
          <Grid item xs={12} md={2} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Stage
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {candidateData?.stage ?? "---"}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      {candidateData?.rejected === true && (
        <Card sx={{ p: 2, mb: 2 }}>
          <Grid container>
            <Grid item xs={12} md={1.5}>
              <Box display="flex" alignItems="centers">
                {getIconBasedOnStatus("Rejected", theme)}
              </Box>
            </Grid>
            <Grid item xs={12} md={8.5}>
              <Typography variant="subtitle2">
                After Application Review on{" "}
                {dayjs(candidateData?.rejectedDate).format("MM/DD/YYYY") ?? "-"}{" "}
                {candidateData?.rejectionReason &&
                  `(${candidateData?.rejectionReason ?? ""})`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2} sx={{ textAlign: "end" }}>
              {/* <Link href={`/candidates/candidate-details?jobId=${jobId}&candidateID=${candidateId}`}> */}
                <Button
                  // onClick={() => {
                  //   router.push(
                  //     `/candidates/candidate-details?jobId=${jobId}&candidateID=${candidateId}`
                  //   );
                  // }}
                  sx={{ p: "0px 10px" }}
                >
                  Scorecards
                </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}

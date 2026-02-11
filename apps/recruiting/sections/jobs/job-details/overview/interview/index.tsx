import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { EditInterviewModal } from "../edit-interview-modal";
import { useSearchParams } from "next/navigation";
import { useGetJobDetailsQuery } from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import { CustomTable } from "common";

export function Interview(): JSX.Element {
  const [interview, setInterview] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const theme = useTheme();
  const { data, isLoading, isSuccess, isError }: any = useGetJobDetailsQuery({
    jobId,
  });
  const stagesData = data?.data[0]?.interviewPlan;

  const columns = [
    {
      accessorFn: (row) => row?.stageName,
      id: "stageName",
      cell: (info) => (
        <Typography variant="body1">{info.getValue() ?? "---"}</Typography>
      ),
      header: () => <Typography variant="body1">Stages</Typography>,
    },
    {
      accessorFn: (row) => row?.interviewName,
      id: "interviewName",
      cell: (info) => {
        return info?.row?.original?.interviews?.map((item) => (
          <Box key={item._id}>
            {item?.applicationReview?.interviewName ?? "---"}
          </Box>
        ));
      },
      header: () => <Typography variant="body1">Interview Kits</Typography>,
    },
  ];

  return (
    <Box>
      {isError && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.error.main}
        >
          Something Went Wrong{" "}
        </Typography>
      )}
      {isLoading && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.text.secondary}
        >
          Loading...{" "}
        </Typography>
      )}
      {isSuccess && (
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f2f4f7",
                pb: 2,
              }}
            >
              <Typography variant="h6">Interview</Typography>
              <Button
                onClick={() => {
                  setInterview(true);
                }}
                variant="outlined"
                sx={{ padding: "10px 0px" }}
              >
                Edit
              </Button>
            </Box>
            <CustomTable
              columns={columns}
              data={stagesData}
              isLoading={isLoading}
              isFetching={false}
              isError={isError}
              isSuccess={isSuccess}
              isPagination={false}
              showSerialNo
            />
          </CardContent>
        </Card>
      )}

      <EditInterviewModal interview={interview} setInterview={setInterview} />
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import { useGetJobInfoQuery } from "@services/jobs/create-jobs/job-info/job-info-api";
import { useSearchParams } from "next/navigation";

export function JobDetailsHeader({ mainTitle }): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data } = useGetJobInfoQuery({
    jobId,
  });

  const selectColor = (status) => {
    let color;
    switch (status) {
      case "draft":
        color = "primary.main";
        break;
      case "open":
        color = "success.main";
        break;
      case "close":
        color = "error.main";
        break;
      default:
        color = "primary.main";
    }
    return color;
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography variant="h5" sx={{ color: "text.primary" }}>
        {mainTitle}
      </Typography>
      <Typography variant="subtitle1">
        Job Status:{" "}
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ color: selectColor(data?.data?.status) }}
        >
          {data?.data?.status ?? "-"}
        </Typography>
      </Typography>
    </Box>
  );
}

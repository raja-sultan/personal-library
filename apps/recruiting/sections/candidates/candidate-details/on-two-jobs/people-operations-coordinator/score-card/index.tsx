import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import { CustomAccordion, NoContentFound } from "common";
import { useGetRecommendationsQuery } from "@services/candidate/candidate-details/on-two-jobs/score-card/score-card-api";
import { ScoreCardDetails } from "./score-card-details";
import React from "react";
import { BASE_URL } from "@root/config";
import { useSearchParams, useRouter } from "next/navigation";

export function CoordinatorScoreCard(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");

  const { data, isError, isLoading } = useGetRecommendationsQuery({
    payload: {
      jobId,
      candidateId,
    },
  });

  const handleSubmitButton = () => {
    router.push(
      `/application-review?candidateId=${candidateId}&jobId=${jobId}&action=add`
    );
  };

  return (  
    <Box sx={styles.mainWrapper}>
      <Box sx={styles.bodyStyling}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Overall Recommendations
        </Typography>
        <Button
          startIcon={<SystemUpdateAltOutlinedIcon />}
          variant="outlined"
          onClick={() => {
            router.push(
              `${BASE_URL}candidates/assigned-scorecard/export/${jobId}`
            );
          }}
        >
          Export as PDF
        </Button>
      </Box>
      {isLoading ? (
        <Skeleton animation="wave" sx={{ height: 200 }} />
      ) : (
        <Box>
          {data?.data?.map((items: any) => (
            <CustomAccordion
              showBtn
              submitButtonProps={{
                sx: {
                  color: items?.feedback ? "text.secondary" : "text.primary",
                  p: 0,
                },
              }}
              buttonTitle={
                items?.feedback ? items?.feedback : "Submit a new Scorecard"
              }
              inlineHeaderRequired
              title={items?.assignedToName ?? "-"}
              key={items._id}
              subTitle={items?.interviewName ?? "-"}
              handleSubmit={(event: any) => {
                event.stopPropagation();
                handleSubmitButton;
              }}
            >
              <ScoreCardDetails items={items} />
            </CustomAccordion>
          ))}
        </Box>
      )}
      {isError || data?.data.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item width={200}>
            <NoContentFound />
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
}
const styles = {
  mainWrapper: {
    maxHeight: { xs: 500, sm: 600, lg: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
  },
  bodyStyling: {
    backgroundColor: "background.default",
    p: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "4px",
  },
};

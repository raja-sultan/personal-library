import { Box, Button, Typography } from "@mui/material";
import { CustomModal } from "common";
import { styles } from "./advance-modal.styles";
// import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";

export function AdvanceModal(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useGetJobCandidateQuery({
    candidateId: "654e38506daaebe6a0252792",
  });

  const index = data?.data?.candidateData?.details?.findIndex(
    (i) => i.stage === data?.data?.candidateData?.stage
  );
  const currentStage = data?.data?.candidateData?.details?.[index];
  const NextStage = data?.data?.candidateData?.details?.[index + 1];
  const rejectedData = data?.data?.candidateData?.details?.find(
    (i) => i.stage === "rejected"
  );

  //   const router = useRouter();
  //   const params = useSearchParams();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Advance
      </Button>
      <CustomModal
        onClose={setOpen}
        rootSx={styles.modalStyling}
        headerLabel={`${data?.data?.candidateData?.stage} for ${data?.data?.candidateData?.job}`}
        closeButtonProps={{
          onClick: () => {
            setOpen(false);
          },
        }}
        isOpen={open}
      >
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography variant="body1" sx={styles.mainTitle}>
            Well Done
          </Typography>
          <Typography variant="subtitle2" sx={styles.mainDescription}>
            {`You've reviewed 1 application and action 1 for Data Engineer in 3 minutes 36 seconds.`}
          </Typography>
        </Box>
        <StageCard
          count={rejectedData?.count}
          textColor="error.main"
          stage="Rejected"
          helperText="for role "
          percentage={rejectedData?.percentage}
        />
        <StageCard
          count={currentStage?.count}
          textColor="text.secondary"
          stage="No Action taken"
          helperText="on application"
          percentage={currentStage?.percentage}
        />
        {NextStage?.stage !== "rejected" && (
          <StageCard
            count={NextStage?.count}
            textColor="success.main"
            stage="Advanced"
            helperText="to next stage"
            percentage={NextStage?.percentage}
          />
        )}
        <Box width="100%" justifyContent="flex-end" display="flex">
          <Typography
            variant="subtitle2"
            sx={{
              width: "max-content",
              p: 1,
              "&:hover": {
                cursor: "pointer",
                bgcolor: "primary.lightest",
                borderRadius: 1,
                boxShadow: 2,
              },
            }}
            color="primary.main"
            onClick={() => {
              //   router.push(`jobs/job-details?jobId=${params.get("jobId")}`);
            }}
          >
            View candidates in next stage
          </Typography>
        </Box>
      </CustomModal>
    </>
  );
}

function StageCard(props): JSX.Element {
  const { count = 0, textColor, stage, percentage = 0, helperText } = props;
  return (
    <Box sx={styles.mainWrapper}>
      <Typography variant="h6" sx={styles.titleStyling}>
        {count}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="subtitle2" sx={{ color: textColor }}>
          {`${stage} `}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
          {`${helperText} (${percentage?.toFixed(2)}%)`}
        </Typography>
      </Box>
    </Box>
  );
}

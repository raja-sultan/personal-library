import { useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { CustomModal } from "common";
import { useSearchParams } from "next/navigation";
import {
  useGetInterviewPlanStagesQuery,
  useUpdateStageMutation,
} from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import toast from "react-hot-toast";

export function MoveStageModel({
  setOpenMoveStage,
  openMoveStage,
}: any): JSX.Element {
  const [currentStage, setCurrentStage] = useState<any>({});
  const theme = useTheme();

  const params = useSearchParams();

  const { data: stagesData, isLoading }: any = useGetInterviewPlanStagesQuery(
    params.get("jobId")
  );

  const [updateStageHandler] = useUpdateStageMutation();

  const pipelineStages = stagesData?.data;

  async function moveStageHandler(data): Promise<any> {
    try {
      await updateStageHandler(data).unwrap();
      toast.success("Candidate Moved Successfully");
      setOpenMoveStage(false);
    } catch {
      () => {
        toast.error("Something went wrong");
      };
    }
  }
  return (
    <CustomModal
      onClose={() => {
        setOpenMoveStage(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 700 },
      }}
      headerLabel="Move Candidate to another stage"
      closeButtonProps={{
        onClick: () => {
          setOpenMoveStage(false);
        },
      }}
      isOpen={openMoveStage}
    >
      <Typography variant="subtitle1">
        Advance candidate to another stage in your pipeline, or move the
        candidate to an earlier stage.
      </Typography>
      {isLoading ? (
        <Typography>Please Wait . . .</Typography>
      ) : (
        <Stack spacing={1.4} pt={2}>
          {pipelineStages?.map((item) => (
            <>
              {item?.stage?.toLowerCase() !== "rejected" && (
                <Box
                  key={item}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      currentStage === item
                        ? theme.palette.primary.alpha12
                        : theme.palette.neutral[100],
                    borderRadius: "10px",
                    p: 2,
                  }}
                  onClick={() => {
                    setCurrentStage(item);
                  }}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {item?.stageName}
                  </Typography>
                </Box>
              )}
            </>
          ))}
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenMoveStage(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                moveStageHandler({
                  stageId: currentStage?._id,
                  jobId: params.get("jobId"),
                  payload: { stageName: currentStage?.stageName },
                }).catch(() => {});
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      )}
    </CustomModal>
  );
}

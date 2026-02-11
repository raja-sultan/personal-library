import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, InputLabel } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { type SetStateAction, type Dispatch } from "react";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./feedback-modal.schema";
import type { feedbackModalTypes, feedbackTypes } from "./feedback-modal.types";
import { feedbackData } from "./feedback-modal.data";
import { useState } from "react";
import { styles } from "./feedback-modal.styles";
import { useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { useCandidateFeedbackMutation } from "@services/jobs/job-details/pipeline-api";
import toast from "react-hot-toast";

export function FeedbackModal({
  feedback,
  setFeedback,
}: {
  feedback: boolean;
  setFeedback: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const methods = useForm<feedbackModalTypes>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const [feedbackEmoji, setFeedbackEmoji] = useState<feedbackTypes | undefined>(
    feedbackData[2]
  );
  const params = useSearchParams();

  const [postFeedback, { isLoading }] = useCandidateFeedbackMutation();
  const handleFeedbackDataClick = (item) => () => {
    setFeedbackEmoji(item);
  };

  const onSubmit = async (data): Promise<any> => {
    const formData = {
      jobId: params.get("jobId"),
      canidateId: params.get("candidateId"),
      emoji: feedbackEmoji?.value,
      leaveFeedback: data.feedback,
    };
    try {
      await postFeedback(formData).unwrap();
      toast.success("Feedback Submitted");
      setFeedback(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <CustomModal
      onClose={setFeedback}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Leave Feedback"
      closeButtonProps={{
        onClick: () => {
          setFeedback(false);
        },
      }}
      isOpen={feedback}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 2 }}>
          {feedbackData.map((item: feedbackTypes) => (
            <Box
              border={1}
              borderRadius={1}
              key={item.id}
              onClick={handleFeedbackDataClick(item)}
              bgcolor={
                item.id === feedbackEmoji?.id ? "primary.light" : "transparent"
              }
              sx={{
                borderColor: "neutral.300",
                display: "flex",
                alignItems: "center",
                minHeight: "50px",
                my: 1,
                px: 1,
                "&:hover": {
                  bgcolor: "primary.lightest",
                  cursor: "pointer",
                },
              }}
            >
              {item.title}
            </Box>
          ))}
          <InputLabel sx={{ my: 1, color: "text.secondary" }}>
            Leave Feedback
          </InputLabel>
          <RHFTextField
            multiline
            fullWidth
            type="text"
            name="feedback"
            sx={{ mb: 2 }}
            rows={2}
          />
          <Box sx={styles.buttonWrapper}>
            <Button
              variant="outlined"
              onClick={() => {
                setFeedback(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

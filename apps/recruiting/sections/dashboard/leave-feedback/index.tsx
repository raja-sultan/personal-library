import { useState } from "react";
import { Button, Box } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import { feedbackData } from "./feedback-modal.data";
import type { feedbackTypes } from "./feedback-modal.types";

export function LeaveFeedback(): JSX.Element {
  const [leaveFeedBack, setLeaveFeedBack] = useState(false);
  const [feedbackEmoji, setFeedbackEmoji] = useState<feedbackTypes | undefined>(
    feedbackData[2]
  );
  const handleFeedbackDataClick = (item) => () => {
    setFeedbackEmoji(item);
  };

  const methods = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const { handleSubmit } = methods;
  const onSubmitHandler = (data: any) => {
    console.log(data, feedbackEmoji?.value);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setLeaveFeedBack(true);
        }}
      >
        Leave Feedback
      </Button>
      <CustomModal
        onClose={() => {
          setLeaveFeedBack(false);
        }}
        rootSx={{
          maxWidth: { xs: 350, sm: 700 },
        }}
        headerLabel="Leave Feedback"
        closeButtonProps={{
          onClick: () => {
            setLeaveFeedBack(false);
          },
        }}
        isOpen={leaveFeedBack}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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
          <RHFTextField
            name="feedback"
            multiline
            rows={4}
            placeholder="Enter a feedback..."
            outerLabel="Leave feedback..."
          />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button type="button" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
              Save
            </Button>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}

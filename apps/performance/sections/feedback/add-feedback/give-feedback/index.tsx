"use client";
import { FormProvider, RHFAutocompleteSync, RHFRadioGroup, RHFTextField } from "common";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import EmojiList from "@components/emoji-reactions/emoji-list";
import { useGiveFeedback } from "./use-give-feedback";
import { styles } from "@sections/feedback/add-feedback/add-feedback-styles";
import { LoadingButton } from "@mui/lab";

export function GiveFeedback({ backPath }: { backPath?: string | null }): JSX.Element {
  const {
    onSubmit,
    router,
    methods,
    handleSubmit,
    selectedEmoji,
    handleReaction,
    employeeData,
    transformedOptions,
    isLoading
  } = useGiveFeedback({ backPath });

  return (
    <Card sx={{ p: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Feedback about
            </Typography>
            <Typography variant="body2" fontSize="1.4rem" mt="0.2rem" color="text.secondary">
              Select the name of the person from the list you want to share your feedback about.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <RHFAutocompleteSync
              multiple
              name="feedbackReceiverId"
              outerLabel={
                <Typography variant="subtitle1" fontWeight={600}>
                  Who’s the feedback about?
                </Typography>
              }
              placeholder="Select"
              options={
                employeeData?.data?.length
                  ? employeeData.data.map((item) => {
                    return {
                      id: item.value,
                      name: item.text,
                      value: item.value,
                    };
                  })
                  : []
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ my: 3 }} />
            {transformedOptions.length > 0 &&
              <>
                <RHFRadioGroup
                  name="feedbackVisibility"
                  options={transformedOptions}
                  sx={{
                    "& .MuiFormControlLabel-root": { alignItems: "flex-start" },
                    "&.MuiFormGroup-root": { gap: "48px" },
                  }}
                />
                <Divider sx={{ my: 3 }} />
              </>
            }
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Ratings
            </Typography>
            <Typography variant="body2" fontSize="1.4rem" mt="0.2rem" color="text.secondary">
              Rate your co-workers and help them in evaluating their overall performance easily.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <EmojiList onEmojiClick={handleReaction} selectedEmoji={selectedEmoji} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Your Feedback
            </Typography>
            <Typography variant="body2" fontSize="1.4rem" mt="0.2rem" color="text.secondary">
              Write your feedback text here.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="senderFeedbackText"
              outerLabel={
                <Typography variant="subtitle1" fontWeight={600}>
                  What’s your feedback?
                </Typography>
              }
              placeholder="Write something.."
              minRows={3}
              multiline
            />
          </Grid>
        </Grid>

        <Box sx={styles.buttonsBox}>
          <Button
            type="button"
            onClick={() => {
              router.push(backPath ?? '/feedback');
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            Send Feedback
          </LoadingButton>
        </Box>
      </FormProvider>
    </Card>
  );
}

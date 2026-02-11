import React from "react";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { FormProvider, RHFAutocompleteSync, RHFTextField } from "common";
import { usePrivateNote } from "@sections/feedback/add-feedback/private-note/use-private-note";
import { styles } from "@sections/feedback/add-feedback/add-feedback-styles";
import { LoadingButton } from "@mui/lab";


export function PrivateNote({ backPath }: { backPath?: string | null }): JSX.Element {
  const { onSubmit, router, methods, handleSubmit, employeeData, watch, isLoading } = usePrivateNote({ backPath });

  return (
    <Card sx={{ p: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Feedback about
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Select the name of the person from the list you want to share your
              feedback about.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <RHFAutocompleteSync
              multiple
              name="aboutFeedback"
              outerLabel={<Typography variant="subtitle1" fontWeight={600}>Who’s the feedback about?</Typography>}
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
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Your Feedback
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Write your feedback text here.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="yourFeedback"
              outerLabel={<Typography variant="subtitle1" fontWeight={600}>What’s your feedback?</Typography>}
              placeholder="Write something.."
              maxRows={7}
              minRows={3}
              multiline
            />
            <Typography mt={0.5} color="text.secondary" variant="subtitle2" textAlign="end">{watch()?.yourFeedback?.length}/500</Typography>
          </Grid>
        </Grid>

        <Box
          sx={styles.buttonsBox}
        >
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
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </Card>
  );
}

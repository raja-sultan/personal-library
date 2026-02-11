import React from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Card, Grid, Typography, Stack } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFTextField,
} from "common";
import { usePostModal } from "./use-post-modal";

export function PostModal({
  openPostModal,
  setOpenPostModal,
}): React.JSX.Element {
  const { methods, onSubmit, apiQuery, handleSubmit } = usePostModal({
    openPostModal,
    setOpenPostModal,
  });

  return (
    <CustomModal
      isOpen={openPostModal}
      onClose={() => {
        setOpenPostModal(false);
      }}
      headerLabel="Share on LinkedIn"
      rootSx={{ width: { md: "40%", xs: "60%" } }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12}>
            <RHFAutocompleteAsync
              multiple
              name="job"
              queryKey="search"
              outerLabel="Job"
              limitTags={3}
              // (Start) Remove this when integrating API
              getOptionId={(option: any) => option.id}
              isOptionEqualToValue={(option: any, newValue: any) =>
                option.id === newValue.id
              }
              // (End) Remove this when integrating API
              apiQuery={apiQuery}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFAutocompleteAsync
              multiple
              name="post"
              queryKey="search"
              outerLabel="Post"
              limitTags={3}
              // (Start) Remove this when integrating API
              getOptionId={(option: any) => option.id}
              isOptionEqualToValue={(option: any, newValue: any) =>
                option.id === newValue.id
              }
              // (End) Remove this when integrating API
              apiQuery={apiQuery}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFAutocompleteAsync
              multiple
              name="template"
              queryKey="search"
              outerLabel="Template"
              limitTags={3}
              // (Start) Remove this when integrating API
              getOptionId={(option: any) => option.id}
              isOptionEqualToValue={(option: any, newValue: any) =>
                option.id === newValue.id
              }
              // (End) Remove this when integrating API
              apiQuery={apiQuery}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <Typography
                variant="body2"
                component="h6"
                p={2}
                sx={{
                  color: "info.main",
                  backgroundColor: "info.lightest",
                }}
              >
                Candidates for jobs configured to comply with GDPR will
                automatically be emailed GDPR information after being imported.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFTextField
              multiline
              minRows={3}
              name="feedback"
              outerLabel="Leave Feedback..."
              placeholder="Enter a feedback.."
            />
          </Grid>
        </Grid>
        <Stack
          direction={{ md: "row-reverse", xs: "column" }}
          rowGap={1}
          columnGap={1}
          marginTop="30px"
        >
          <LoadingButton type="submit" variant="contained">
            Post
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenPostModal(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}

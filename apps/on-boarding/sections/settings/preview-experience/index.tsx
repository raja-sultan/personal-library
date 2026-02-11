import React, { useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { PreviewExperienceModal } from "./preview-experince-modal";
import { FormProvider } from "common";
import { usePreviewExperience } from "./use-preview-experience";

export function PreviewExperienceSection(): JSX.Element {
  const [previewModal, setPreviewModal] = useState(false);
  const { editPreviewData, methods, handleSubmit, onSubmit, reset } =
    usePreviewExperience();
  const closePreviewModal = (): void => {
    setPreviewModal(false);
  };

  return (
    <Stack rowGap={2}>
      <Typography variant="h6">Welcome Experience</Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={1} rowGap={2}>
          {editPreviewData?.map((item) => (
            <Grid item xs={12} lg={2.5} md={item?.md} key={item?.id}>
              {item?.component && <item.component {...item.componentProps} />}
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            lg={2}
            md={4}
            textAlign={{ lg: "right", md: "center" }}
            my="auto"
          >
            <Button
              onClick={() => {
                reset();
              }}
              variant="text"
            >
              Reset filters
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end", mt: 2 }}
        onClick={() => {
          setPreviewModal(true);
        }}
      >
        Launch Preview Experience
      </Button>
      <PreviewExperienceModal
        isOpen={previewModal}
        closeModel={closePreviewModal}
      />
    </Stack>
  );
}

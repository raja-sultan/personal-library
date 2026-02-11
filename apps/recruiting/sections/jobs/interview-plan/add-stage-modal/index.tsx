import React, { useEffect } from "react";
import { CustomModal, FormProvider, RHFCheckbox, RHFTextField } from "common";
import { Box, Grid, Button } from "@mui/material";

export function AddStageModal(props: any): JSX.Element {
  const { openAddStageModal, setOpenAddStageModal, methods, onSubmitNewStage } =
    props;
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    return reset();
  }, [reset]);

  return (
    <CustomModal
      onClose={setOpenAddStageModal}
      rootSx={{
        maxWidth: 600,
      }}
      // footer
      headerLabel="Add Stage"
      acceptButtonLabel="Save"
      acceptButtonProps={{
        variant: "contained",
      }}
      cancelButtonsProps={{
        onClick: () => {
          setOpenAddStageModal(false);
        },
      }}
      closeButtonProps={{
        onClick: () => {
          setOpenAddStageModal(false);
        },
      }}
      isOpen={openAddStageModal}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitNewStage)}>
        <Box mt={2}>
          <RHFTextField
            name="yourFieldName"
            type="text"
            sx={{ width: "95%" }}
          />
        </Box>
        <Grid
          container
          flexWrap="nowrap"
          direction="column"
          mt={2}
          sx={{
            maxHeight: "250px",
            overflowY: "scroll",
          }}
        >
          <RHFCheckbox label="Application Review" name="Application Review" />
          <RHFCheckbox label="Background Check" name="Background Check" />
          <RHFCheckbox label="Document Submission" name="Document Submission" />
          <RHFCheckbox label="Executive Review" name="Executive Review" />
          <RHFCheckbox label="Face to Face" name="Face To Face" />
          <RHFCheckbox label="Face to Face 2" name="Face To Face 2" />
          <RHFCheckbox
            label="Hiring Manager Review"
            name="Hiring Manager Review"
          />
          <RHFCheckbox label="Offer" name="Offer" />
          <RHFCheckbox label="Offer Short List" name="Offer Short List" />
          <RHFCheckbox label="Phone Interview" name="Phone Interview" />
          <RHFCheckbox label="Phone Interview 2" name="Phone Interview 2" />
          <RHFCheckbox
            label="Preliminary Phone Screen"
            name="Preliminary Phone Screen"
          />
          <RHFCheckbox label="Reference Check" name="Reference Check" />
          <RHFCheckbox label="Take Home Test" name="Take Home Test" />
          <RHFCheckbox label="Trial Project" name="Trial Project" />
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="end"
          gap={2}
          mt={1.5}
        >
          <Button
            variant="outlined"
            sx={{ height: 37 }}
            onClick={() => {
              setOpenAddStageModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ px: 2.7, height: 37 }}
          >
            Save
          </Button>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}

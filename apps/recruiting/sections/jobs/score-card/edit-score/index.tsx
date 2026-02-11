import { Button, Grid, Box, Divider } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, RHFTextField } from "common";
import { styles } from "./edit-score.styles";
import { useEditScore } from "./use-edit-score";
import { LoadingButton } from "@mui/lab";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";

export function EditScoreCard({ getId, setShowReplacement }: any): JSX.Element {
  const {
    handleSubmit,
    handleFormSubmit,
    onSubmit,
    fields,
    append,
    remove,
    methods,
    control,
    isLoading,
    isSubmitting,
  } = useEditScore({ getId, setShowReplacement });

  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        alignItems="start"
        columnSpacing={{ sm: 3, md: 0 }}
        sx={{ mt: 2 }}
      >
        <Grid item xs={12} sm={3.8} xl={4}>
          <RHFTextField
            fullWidth
            type="text"
            name="category"
            sx={{
              maxWidth: { xs: "auto", sm: "274px" },
              mt: { xs: 1 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Box sx={styles.dynamicFieldWrapper}>
                <RHFTextField
                  disabled={isSubmitting}
                  fullWidth
                  type="text"
                  name={`attributes[${index}]`}
                  control={control}
                  sx={styles.textFieldStyling}
                />
                <CloseIcon
                  onClick={() => {
                    remove(index);
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            </React.Fragment>
          ))}
          {/* Add Attributes Button */}
          <Button
            sx={styles.addAttributeButton}
            type="button"
            onClick={() => {
              append("");
            }}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add Attribute
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          lg={4}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <LoadingButton
            loading={isSubmitting}
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
            sx={styles.saveButtonStyling}
          >
            Save
          </LoadingButton>
        </Grid>
        <Divider sx={styles.dividerStyling} />
      </Grid>
    </FormProvider>
  );
}

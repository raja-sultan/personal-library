import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteSync,
  RHFEditor,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

export function ForwardEmailModal(props: any): JSX.Element {
  const { resumeModal, setResumeModal } = props;
  const methods = useForm({
    // resolver: yupResolver(jobCandidateValidationSchema),
    defaultValues: { jobCandidateDefaultValues: "" },
  });
  const { handleSubmit } = methods;

  function onSubmit(formData): void {
    console.log(formData);
  }
  return (
    <CustomModal
      isOpen={resumeModal}
      onClose={() => {
        setResumeModal(false);
      }}
      closeButtonProps={{
        onClick: () => {
          setResumeModal(false);
        },
      }}
      headerLabel="Forward Resume"
      rootSx={{ width: { md: "40%", xs: "60%" } }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowGap={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <RHFAutocompleteSync
              multiple
              name="testSyncSelect"
              outerLabel="Email to"
              placeholder="Select"
              options={[
                { id: 1, name: "Faisal Naeem", value: "Faisal Naeem" },
                { id: 2, name: "Faisal Naeem", value: "Faisal Naeem" },
              ]}
            />
            <Typography color="text.disabled" variant="caption">
              Only Users with the necessary permissions will see the full report
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="subject"
              outerLabel="Subject"
              placeholder="None"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFEditor name="body" outerLabel="Body" />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ md: "row-reverse", xs: "column" }}
              rowGap={1}
              columnGap={1}
            >
              <LoadingButton type="submit" variant="contained">
                Email Report
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => {
                  setResumeModal(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}

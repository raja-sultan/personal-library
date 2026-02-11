import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFSelect, RHFSwitch } from "common";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  // other fields...
  departmentMatches: yup.string().required("This field is required"),
  locationMatches: yup.string().required("This field is required"),
  employmentStatus: yup.string().required("This field is required"),
  otherCriteria: yup.string().required("This field is required"),
  importSwitch: yup.string().required("This field is required"),
});

export function ApplicantTrackingModal(props): JSX.Element {
  const { applicantTack, setApplicantTrack } = props;

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      departmentMatches: "",
      locationMatches: "",
      employmentStatus: "",
      otherCriteria: "",
      importSwitch: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setApplicantTrack(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);
  return (
    <CustomModal
      onClose={() => {
        setApplicantTrack(false);
      }}
      headerLabel="Change Import Settings"
      closeButtonProps={{
        onClick: () => {
          setApplicantTrack(false);
        },
      }}
      isOpen={applicantTack}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
    >
      <Typography variant="body1" sx={{ mt: 4 }}>
        Only import new hires whose...
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSelect
              size="medium"
              placeholder="Any Department"
              name="departmentMatches"
              outerLabel="Department matches"
            >
              <option value="BusinessAnalysis">Business Analysis</option>
              <option value="HumanResources">Human Resources</option>
              <option value="Sales&Marketing">Sales & Marketing</option>
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSelect
              size="medium"
              placeholder="Any Location"
              name="locationMatches"
              outerLabel="Location matches"
            >
              <option value="DublinOffice">Dublin Office</option>
              <option value="Glasgow Office">Glasgow Office</option>
              <option value="LondonOffice">London Office</option>
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSelect
              size="medium"
              placeholder="Any Employment Status"
              name="employmentStatus"
              outerLabel="Employment Status matches"
            >
              <option value="Contract">Contract</option>
              <option value="female">Full-Time</option>
              <option value="Full-Time">Intern</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Temporary">Temporary</option>
              <option value="Terminated">Terminated</option>
            </RHFSelect>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <RHFSelect
                size="medium"
                placeholder="Any Other Criteria"
                name="otherCriteria"
                outerLabel="Other Criteria matches"
              >
                <option value="WelcomeEmail">Welcome Email</option>
              </RHFSelect>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSwitch name="importSwitch" label="Import File attachments" />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Note that when you turn this toggle on the following documents
              will import from Personnel Library Recruiting: scorecard feedback
              resumes, cover letters, and offer documents.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setApplicantTrack(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" type="submit">
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

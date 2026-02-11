import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider, RHFSelect } from "common";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  // other fields...
  accessToken: yup.string().required("This field is required"),
  subdomain: yup.string().required("This field is required"),
});

export function NamelyModal(props): JSX.Element {
  const { namelyOpen, setNamelyOpen } = props;

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      accessToken: "",
      subdomain: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setNamelyOpen(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);
  return (
    <CustomModal
      onClose={() => {
        setNamelyOpen(false);
      }}
      headerLabel="Namely API Key"
      closeButtonProps={{
        onClick: () => {
          setNamelyOpen(false);
        },
      }}
      isOpen={namelyOpen}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSelect
              size="medium"
              placeholder="Access Token"
              name="accessToken"
              outerLabel="Access Token"
            >
              <option value="BusinessAnalysis">Business Analysis</option>
              <option value="HumanResources">Human Resources</option>
              <option value="Sales&Marketing">Sales & Marketing</option>
            </RHFSelect>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <RHFSelect
                size="medium"
                placeholder="Any Subdomain"
                name="subdomain"
                outerLabel="Subdomain"
              >
                <option value="BusinessAnalysis">Business Analysis</option>
                <option value="HumanResources">Human Resources</option>
                <option value="Sales&Marketing">Sales & Marketing</option>
              </RHFSelect>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setNamelyOpen(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" type="submit">
            Save and Close
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider, RHFSelect } from "common";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  // other fields...
  company: yup.string().required("This field is required"),
});

export function BambooHrModal(props): JSX.Element {
  const { bambooHrOpen, setBambooHrOpen } = props;

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      company: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setBambooHrOpen(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);
  return (
    <CustomModal
      onClose={() => {
        setBambooHrOpen(false);
      }}
      headerLabel="BambooHr"
      closeButtonProps={{
        onClick: () => {
          setBambooHrOpen(false);
        },
      }}
      isOpen={bambooHrOpen}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFSelect
              size="medium"
              placeholder="Any Connect"
              name="company"
              outerLabel="company"
            >
              <option value="BusinessAnalysis">Business Analysis</option>
              <option value="HumanResources">Human Resources</option>
              <option value="Sales&Marketing">Sales & Marketing</option>
            </RHFSelect>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setBambooHrOpen(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" type="submit">
            Connect to BambooHr
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

import {  Button, Grid } from "@mui/material";
import { FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateRules(props): JSX.Element {
  const { setIsUpdateRulesOpen } = props;
  const textFieldData = [
    {
      id: 1,
      name: "departmentMatch",
      label: "Department Match",
      xs: 12,
      md: 6,
    },
    { id: 2, name: "locationMatch", label: "Location Match", xs: 12, md: 6 },
    {
      id: 3,
      name: "employmentStatusMatch",
      label: "Employment Status Match",
      xs: 12,
      md: 6,
    },
    {
      id: 4,
      name: "otherCriteriaMatch",
      label: "Other Criteria Match",
      xs: 12,
      md: 6,
    },
  ];
  const defaultValues = {
    departmentMatch: "",
    locationMatch: "",
    employmentStatusMatch: "",
    otherCriteriaMatch: "",
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (formData): void => {
    console.log(formData);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} py={1}>
        {textFieldData?.map((item) => (
          <Grid key={item?.id} item xs={item?.xs} md={item?.md}>
            <RHFTextField name={item?.name} outerLabel={item?.label} />
          </Grid>
        ))}
        <Grid container justifyContent="end" pt={2} gap={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsUpdateRulesOpen(false);
            }}
            size="small"
          >
            Back
          </Button>
          <Button variant="contained" size="small" type="submit">
            Clear Rules
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

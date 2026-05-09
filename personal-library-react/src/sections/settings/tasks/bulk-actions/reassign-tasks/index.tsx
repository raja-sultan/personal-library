import { Box, Button, Grid } from "@mui/material";
import { FormProvider, RHFCustomSelect } from "common";
import React from "react";
import { useForm } from "react-hook-form";

export default function ReassignTasks(props): JSX.Element {
  const { setIsReassignOpen } = props;
  const defaultValues = {
    reassignTasks: [],
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (formData): void => {
    console.log(formData);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box py={1}>
        <RHFCustomSelect
          outerLabel="Select an assignee for 1 task."
          name="reassignTasks"
          options={[
            { id: 1, label: "Employees", value: "employee" },
            { id: 2, label: "Manager", value: "manager" },
          ]}
        />
        <Grid container justifyContent="end" pt={2} gap={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsReassignOpen(false);
            }}
            size="small"
          >
            Back
          </Button>
          <Button variant="contained" size="small" type="submit">
            Reassign
          </Button>
        </Grid>
      </Box>
    </FormProvider>
  );
}

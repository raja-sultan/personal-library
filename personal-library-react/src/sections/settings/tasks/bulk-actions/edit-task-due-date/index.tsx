import { Button, Grid } from "@mui/material";
import { FormProvider, RHFCustomSelect } from "common";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditTaskDueDate(props): JSX.Element {
  const { setIsEditTaskDateOpen } = props;
  const defaultValues = {
    dueDate: [],
    assign: [],
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (formData): void => {
    console.log(formData);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid py={1} container spacing={1}>
        <Grid item md={6} xs={12}>
          <RHFCustomSelect
            outerLabel="Due Date"
            name="dueDate"
            options={[
              { id: 1, label: "Employees", value: "employee" },
              { id: 2, label: "Manager", value: "manager" },
            ]}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <RHFCustomSelect
            outerLabel="Assign"
            name="assign"
            options={[
              { id: 1, label: "Employees", value: "employee" },
              { id: 2, label: "Manager", value: "manager" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="end" pt={2} gap={1}>
        <Button
          variant="outlined"
          onClick={() => {
            setIsEditTaskDateOpen(false);
          }}
          size="small"
        >
          Back
        </Button>
        <Button variant="contained" size="small" type="submit">
          Update
        </Button>
      </Grid>
    </FormProvider>
  );
}

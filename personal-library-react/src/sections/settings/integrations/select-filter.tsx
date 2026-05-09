import { Grid, Button } from "@mui/material";
import { FormProvider, RHFCustomSelect } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  // other fields...
  stages: Yup.string().required("Stages is required"),
  department: Yup.string().required("Department is required"),
  status: Yup.string().required("Status is required"),
  criteria: Yup.string().required("Criteria is required"),
});

export function FilterSelectFields(): JSX.Element {
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      location: "",
      department: "",
      status: "",
      criteria: "",
    },
  });

  const { handleSubmit } = methods;

  function onSubmit(formData): void {
    formData;
    // console.log("my data", formData);
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={2.5}>
          <RHFCustomSelect
            name="location"
            outerLabel="Employee’s Location"
            placeholder="Select"
            options={[
              { id: 0, label: "Select", value: "default" },
              { id: 1, label: "Short Text", value: "shortText" },
              { id: 2, label: "Long Text", value: "longText" },
              { id: 3, label: "Single Select", value: "singleSelect" },
              { id: 4, label: "Multi Select", value: "multiSelect" },
              { id: 5, label: "Attachment", value: "attachment" },
              { id: 6, label: "Date Selection", value: "dateSelection" },
              { id: 7, label: "URL", value: "url" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={2.5}>
          <RHFCustomSelect
            name="department"
            outerLabel="Employee’s Department"
            placeholder="Select"
            options={[
              { id: 0, label: "Select", value: "default" },
              { id: 1, label: "Short Text", value: "shortText" },
              { id: 2, label: "Long Text", value: "longText" },
              { id: 3, label: "Single Select", value: "singleSelect" },
              { id: 4, label: "Multi Select", value: "multiSelect" },
              { id: 5, label: "Attachment", value: "attachment" },
              { id: 6, label: "Date Selection", value: "dateSelection" },
              { id: 7, label: "URL", value: "url" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={2.5}>
          <RHFCustomSelect
            name="status"
            outerLabel="Employee’s Status"
            placeholder="Select"
            options={[
              { id: 0, label: "Select", value: "default" },
              { id: 1, label: "Short Text", value: "shortText" },
              { id: 2, label: "Long Text", value: "longText" },
              { id: 3, label: "Single Select", value: "singleSelect" },
              { id: 4, label: "Multi Select", value: "multiSelect" },
              { id: 5, label: "Attachment", value: "attachment" },
              { id: 6, label: "Date Selection", value: "dateSelection" },
              { id: 7, label: "URL", value: "url" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={2.5}>
          <RHFCustomSelect
            name="criteria"
            outerLabel="Employee’s Criteria"
            placeholder="Select"
            options={[
              { id: 0, label: "Select", value: "default" },
              { id: 1, label: "Short Text", value: "shortText" },
              { id: 2, label: "Long Text", value: "longText" },
              { id: 3, label: "Single Select", value: "singleSelect" },
              { id: 4, label: "Multi Select", value: "multiSelect" },
              { id: 5, label: "Attachment", value: "attachment" },
              { id: 6, label: "Date Selection", value: "dateSelection" },
              { id: 7, label: "URL", value: "url" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={2} sx={{ alignSelf: "center", mt: 2 }}>
          <Button type="submit" variant="text" sx={{ color: "purple.main" }}>
            Reset filter
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

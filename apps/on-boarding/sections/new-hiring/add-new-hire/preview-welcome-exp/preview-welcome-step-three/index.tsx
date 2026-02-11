import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FormProvider } from "common";
import { useForm } from "react-hook-form";
import {
  previewWelcomeStepThreeDefaultValues,
  previewWelcomeStepThreeFormFields,
} from "./data";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

export default function PreviewWelcomeStepThree(props): JSX.Element {
  const { nextStepHandler, previousStepHandler } = props;
  const router = useRouter();
  const methods = useForm({
    defaultValues: previewWelcomeStepThreeDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (formValues) => {
    console.log(formValues);
    nextStepHandler();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={5} py={2}>
        <Typography variant="h5" letterSpacing={-1} pb={1}>
          Tell us about yourself
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          Join your team by sharing information about yourself
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container gap={2} my={2}>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={600}>
                Address Details
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              {previewWelcomeStepThreeFormFields?.map((item) => (
                <Grid item xs={12} md={item?.md} mb={2.5} key={nanoid()}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid container justifyContent="end" gap={1} my={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={previousStepHandler}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                router.push("/home");
              }}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

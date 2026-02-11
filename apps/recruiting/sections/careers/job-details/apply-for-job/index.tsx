"use client";

import { bgImage } from "@assets/images";
import { Container, Box, Paper, Typography, Grid, Button } from "@mui/material";
import { FormProvider, RHFDatePicker, RHFTextField } from "common";
import { applyNowData } from "./apply-for-job-data";
import React from "react";
import { useApplyJob } from "./use-apply-job";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";

export function ApplyForJobSection(): JSX.Element {
  const searchParams = useSearchParams();
  const jobName = searchParams.get("jobName");
  const {
    handleSubmit,
    onSubmit,
    methods,
    fields,
    append,
    remove,
    isSubmitting,
  } = useApplyJob();

  return (
    <>
      <Box sx={{ background: "radial-gradient( #7555ef, #502fb4)" }}>
        <Box
          sx={{
            height: "80dvh",
            backgroundImage: `url(${bgImage.src})`,
            backgroundPosition: "right center",
            backgroundSize: 1000,
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          mb: { xs: 5, sm: 8 },
          mt: { xs: "-450px", sm: "-460px", lg: "-480px" },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3.5 },
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Apply For Job - {jobName ?? "-"}
          </Typography>
          <Box
            sx={{
              mt: 2,
              maxHeight: "65dvh",
              alignItems: "center",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
              overflow: "auto",
              pr: { xs: 2, sm: 3 },
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {applyNowData?.map((item) => (
                  <Grid item key={item?.id} md={item?.md} xs={12}>
                    <item.component {...item?.componentProps} />
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      {item.id === 6 && (
                        <Button
                          sx={{ mt: 3 }}
                          onClick={() => {
                            append({
                              schoolName: "",
                              degree: "",
                              discipline: "",
                              startDate: "",
                              endDate: "",
                            });
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Add Education
                        </Button>
                      )}
                    </Box>
                    {item.id === 6 &&
                      fields.map((field: any, index: any) => (
                        <Box key={field.id} sx={{ mt: 1 }}>
                          <RHFTextField
                            fullWidth
                            type="text"
                            name={`education.${index}.schoolName`}
                            outerLabel="School"
                          />
                          <Box sx={{ py: 2.5 }}>
                            <RHFTextField
                              fullWidth
                              type="text"
                              name={`education.${index}.degree`}
                              outerLabel="Degree"
                            />
                          </Box>
                          <RHFTextField
                            fullWidth
                            type="text"
                            name={`education.${index}.discipline`}
                            outerLabel="Discipline"
                          />
                          <Grid container spacing={3} sx={{ py: 2.5 }}>
                            <Grid item xs={12} sm={6}>
                              <RHFDatePicker
                                fullWidth
                                type="text"
                                name={`education.${index}.startDate`}
                                outerLabel="From"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <RHFDatePicker
                                fullWidth
                                type="text"
                                name={`education.${index}.endDate`}
                                outerLabel="To"
                              />
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              mb: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => {
                                remove(index);
                              }}
                              type="button"
                            >
                              Undo
                            </Button>
                          </Box>
                        </Box>
                      ))}
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  textAlign: "end",
                  my: 3,
                }}
              >
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                >
                  Submit Application
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

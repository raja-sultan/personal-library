import { Button, Grid, Stack, Typography } from "@mui/material";
import { FormProvider, RHFDatePicker, RHFTextField } from "common";
import { useProspectForm } from "./use-prospect-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // Import useEffect

export function Prospect(): JSX.Element {
  const router = useRouter();

  const {
    methods,
    onSubmit,
    isLoading,
    addProspectFormData,
    fields,
    append,
    remove,
    transformedData,
    watch,
  } = useProspectForm();

  // Track form submission status
  const isSubmitting = isLoading || methods.formState.isSubmitting;

  // Handle form submission and scroll behavior
  useEffect(() => {
    if (!isSubmitting && methods.formState.errors) {
      const firstErrorFieldId: any = Object.keys(methods.formState.errors)[0];
      const errorFieldElement = document.getElementById(firstErrorFieldId);
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isSubmitting, methods.formState.errors]);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container columnSpacing={5} rowGap={2}>
        {addProspectFormData?.prospectInitialDetails?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6">Name & Company</Typography>
        </Grid>
        {addProspectFormData?.NameAndCompany?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6">Info</Typography>
        </Grid>
        <Grid item md={4} xs={12} container columnSpacing={4} rowGap={4}>
          {addProspectFormData?.info?.map((item) => (
            <Grid item xs={item?.md} key={item?.id} mt={item.mt}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Education</Typography>
        </Grid>
        <Grid item md={3} xs={12} container columnSpacing={4} rowGap={4}>
          {fields?.map((field: any, index: any) => {
            const startDate = watch(`education.${index}.startDate`);

            function getMinEndDate(): any {
              if (startDate) {
                const minEndDate = new Date(startDate);
                minEndDate.setDate(minEndDate.getDate() + 1); // Ensure minimum end date is one day after start date
                return minEndDate;
              }
              return new Date(); // Default to current date if start date is not selected
            }
            return (
              <Grid item container md={11} xs={12} key={field.id}>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    type="text"
                    name={`education.${index}.schoolName`}
                    outerLabel="School Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    type="text"
                    name={`education.${index}.degree`}
                    outerLabel="Degree"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    type="text"
                    name={`education.${index}.discipline`}
                    outerLabel="Discipline"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFDatePicker
                    fullWidth
                    type="text"
                    name={`education.${index}.startDate`}
                    outerLabel="Start Date"
                    disableFuture
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFDatePicker
                    minDate={getMinEndDate()}
                    fullWidth
                    name={`education.${index}.endDate`}
                    outerLabel="End Date"
                    disabled={!startDate}
                  />
                </Grid>
                {addProspectFormData?.education?.map((item) => (
                  <Grid item xs={12} key={item?.id}>
                    {item?.component && (
                      <item.component
                        {...item.componentProps}
                        name={`education.${index}.customFields.[${item?.id}]`}
                      />
                    )}
                  </Grid>
                ))}
                {fields.length > 1 && (
                  <Grid item xs={12}>
                    <Stack direction="row-reverse" mt={1}>
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
                    </Stack>
                  </Grid>
                )}
              </Grid>
            );
          })}
          <Grid item xs={11}>
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  append({
                    schoolName: "",
                    degree: "",
                    discipline: "",
                    startDate: "",
                    endDate: "",
                    customFields: transformedData,
                  });
                }}
              >
                Add Another Education
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Details</Typography>
        </Grid>

        <Grid item md={3} xs={12} container columnSpacing={4} rowGap={4}>
          {addProspectFormData?.details?.map((item) => (
            <Grid item md={item?.md} xs={12} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="h6">{`Who's responsible for this candidate?`}</Typography>
        </Grid>
        <Grid item md={3} xs={12} container columnSpacing={4} rowGap={4}>
          {addProspectFormData?.responsibleForCandidate?.map((item) => (
            <Grid item md={item?.md} xs={12} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid> */}
        <Grid item xs={12}>
          <Stack
            direction={{ md: "row-reverse", xs: "column" }}
            columnGap={3}
            rowGap={2}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ ml: "1em" }}
            >
              Add Prospect
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => {
                router.push("candidates");
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

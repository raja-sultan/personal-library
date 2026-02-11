import { Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  IsFetching,
  RHFDatePicker,
  RHFTextField,
} from "common";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useNameAndCompanyModal } from "./use-name-and-company-modal";

export function NameAndCompanyModal({ jobInfo, setJobInfo }: any): JSX.Element {
  const {
    methods,
    onSubmit,
    isLoading,
    fields,
    append,
    remove,
    nameAndCompany,
    transformedData,
    reset,
    watch,
  } = useNameAndCompanyModal({ setJobInfo });

  const handleCancel = (): void => {
    reset();
    setJobInfo(false);
  };

  return (
    <CustomModal
      onClose={handleCancel}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, md: 750, lg: 1000, xl: 1200 },
        maxHeight: "80vh",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      closeButtonProps={{
        onClick: () => {
          reset();
          setJobInfo(false);
        },
      }}
      isOpen={jobInfo}
    >
      <IsFetching isFetching={isLoading} />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container columnSpacing={5} rowGap={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Name & Company</Typography>
          </Grid>
          {nameAndCompany?.NameAndCompany?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h5">Info</Typography>
          </Grid>
          <Grid item md={4} xs={12} container columnSpacing={4} rowGap={4}>
            {nameAndCompany?.info?.map((item) => (
              <Grid item xs={item?.md} key={item?.id} mt={item.mt}>
                <item.component {...item.componentProps} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Education</Typography>
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
                      type="text"
                      name={`education.${index}.endDate`}
                      outerLabel="End Date"
                      disabled={!startDate}
                    />
                  </Grid>
                  {nameAndCompany?.education?.map((item) => (
                    <Grid item md={11} xs={12} key={item?.id}>
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
            <Grid item xs={12}>
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
            <Typography variant="h5">Details</Typography>
          </Grid>

          <Grid item md={3} xs={12} container columnSpacing={4} rowGap={4}>
            {nameAndCompany?.detail?.map((item) => (
              <Grid item md={item?.md} xs={12} key={item?.id}>
                <item.component {...item.componentProps} />
              </Grid>
            ))}
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="h5">{`Who's responsible for this candidate?`}</Typography>
          </Grid>

          <Grid item md={3} xs={12} container columnSpacing={4} rowGap={4}>
            {nameAndCompany?.responsibleForCandidate?.map((item) => (
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
                Save
              </LoadingButton>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}

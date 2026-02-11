import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, IsFetching } from "common";
import { OptionalInformation } from "./optional-information";
import { useJobInfo } from "./use-job-info";
import { JobOpenings } from "./job-openings";
import StepperFormSkeleton from "../stepper-form-skeleton";
import { CustomFieldFunction } from "@sections/candidates/add-candidates/job-candidate/job.candidate.data";
import { GenFormField } from "@components/form-fields-generator";
import { fieldsInfo } from "./form-data";

export function JobInfoForm({
  nextStepHandler,
}: {
  nextStepHandler: () => void;
}): JSX.Element {
  const {
    jobInfoHolder,
    onSubmit,
    isSubmitting,
    methods,
    editorVisibilityChangeHand,
    fields,
    remove,
    duplicate,
    addNewJobOpening,
    isLoading,
    isFetching,
    control,
    textFieldData,
    isTextFieldLoading,
    RequisitionId,
  } = useJobInfo({
    nextStepHandler,
  });
  let infoCustomFields: any;
  if (!isTextFieldLoading) {
    const info = textFieldData?.data.filter(
      (item) => item?.section === "Job info fields"
    )[0];
    if (info) {
      infoCustomFields = info?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          // name: `openings.customFields.[${items?._id}]`,
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: items?.fieldType === "long_text" ? 12 : 3,
      }));
    }
  }
  if (isLoading || isFetching) return <StepperFormSkeleton />;
  return (
    <>
      <IsFetching isFetching={isSubmitting} />
      <Box
        sx={{
          height: { xs: "70%", sm: "90%" },
          position: "relative",
          overflowY: "auto",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ padding: "0.5em" }}>
            <Typography variant="h5">Job Info</Typography>
          </Grid>
        </Grid>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {fieldsInfo.map((item: any, index: number) => {
              const props = item?.OuterConProps ? item?.OuterConProps : {};
              return (
                <Grid item md={props?.md} xs={12} key={index}>
                  <GenFormField
                    key={index}
                    item={item}
                    isSubmitting={isSubmitting}
                    disabled={jobInfoHolder.disabled}
                  />
                </Grid>
              );
            })}

            {infoCustomFields?.map((items) => (
              <Grid item md={items?.md} xs={12} key={items?.id}>
                {items?.component && (
                  <items.component
                    {...items.componentProps}
                    name={`customFields.[${items?.id}]`}
                  />
                )}
              </Grid>
            ))}
            <Grid item sm={12} sx={{ p: "0.5em" }}>
              <Typography variant="h5" sx={{ mb: "0.5em" }}>
                Openings
              </Typography>
              <Button variant="contained" onClick={addNewJobOpening}>
                Add New
              </Button>
            </Grid>
            <Grid item lg={12}>
              <JobOpenings
                fields={fields}
                remove={remove}
                duplicate={duplicate}
                control={control}
                textFieldData={textFieldData}
                isTextFieldLoading={isTextFieldLoading}
                RequisitionId={RequisitionId}
              />
            </Grid>
          </Grid>
          <OptionalInformation
            jobInfoHolder={jobInfoHolder}
            editorVisibilityChangeHand={editorVisibilityChangeHand}
          />
        </FormProvider>
      </Box>
      <Grid
        container
        alignItems="center"
        sx={{
          p: "0.5em",
          height: { xs: "30%", sm: "10%" },
          position: "relative",
        }}
        justifyContent="space-between"
      >
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button variant="outlined" color="primary" sx={{ width: "100%" }}>
            Back
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
            display: { xs: "flex" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

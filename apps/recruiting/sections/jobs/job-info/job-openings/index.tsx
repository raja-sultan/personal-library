import React, { memo, useState } from "react";
import { FormLabel, Grid } from "@mui/material";
import {
  RHFAutocompleteAsync,
  RHFCustomSelect,
  RHFDatePicker,
  RHFTextField,
} from "common";
import { SingleJobOpeningFormActions } from "./single-job-opening-actions";
import { useLazyCloseReasonListQuery } from "@services/jobs/create-jobs/job-info/job-info-api";
import { Controller } from "react-hook-form";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { CustomFieldFunction } from "@sections/candidates/add-candidates/job-candidate/job.candidate.data";

function Openings({
  fields,
  remove,
  duplicate,
  control,
  textFieldData,
  isTextFieldLoading,
  RequisitionId,
}): JSX.Element {
  const [openDates, setOpenDates] = useState<(Date | undefined)[]>([]);
  const [targetDates, setTargetDates] = useState<(Date | undefined)[]>([]);
  let openingsCustomFields: any;

  const apiQuery = useLazyCloseReasonListQuery();

  if (!isTextFieldLoading) {
    const openings = textFieldData?.data.filter(
      (item) => item?.section === "Job opening fields"
    )[0];
    if (openings) {
      openingsCustomFields = openings?.customFields.map((items) => ({
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
        md: items?.fieldType === "long_text" ? 12 : 2,
      }));
    }
  }
  return (
    <>
      {fields?.map((item: any, index: number) => {
        const openDate = openDates[index];
        const isOpenDateSelected = openDate !== undefined;
        const targetStartDate = targetDates[index];
        const isTargetStartDateSelected = targetStartDate !== undefined;

        return (
          <Grid item container lg={12} key={item.id} spacing={1}>
            <Grid item lg={12} xs={12} sx={{ m: "0.2em 0" }}>
              <SingleJobOpeningFormActions
                remove={() => {
                  remove(index);
                }}
                duplicate={() => duplicate(index)}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <RHFTextField
                value={`${RequisitionId}-${index + 1}`}
                outerLabel="Opening ID"
                placeholder="Select Opening Id"
                fullWidth
                name={`openings.${index}.openingId`}
                disabled
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <RHFCustomSelect
                name={`openings.${index}.status`}
                outerLabel="Status"
                fullWidth
                options={[
                  { id: 1, label: "Open", value: "Open" },
                  { id: 2, label: "Closed", value: "Closed" },
                ]}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Controller
                name={`openings.${index}.openDate`}
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Stack gap="0.6rem">
                      <FormLabel>Open Date</FormLabel>
                      <DatePicker
                        {...field}
                        minDate={new Date()}
                        // {...other}
                        slotProps={{
                          textField: {
                            helperText: error ? error.message : "",
                            error: Boolean(error),
                            variant: "outlined",
                          },
                        }}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                          const newOpenDates = [...openDates];
                          newOpenDates[index] = newValue;
                          setOpenDates(newOpenDates);
                        }}
                        // label={label}
                      />
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Controller
                name={`openings.${index}.targetStartDate`}
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Stack gap="0.6rem">
                      <FormLabel>Target Date</FormLabel>
                      <DatePicker
                        {...field}
                        minDate={
                          openDates[index]
                            ? new Date(openDates[index]!.getTime())
                            : undefined
                        }
                        slotProps={{
                          textField: {
                            helperText: error ? error.message : "",
                            error: Boolean(error),
                            variant: "outlined",
                          },
                        }}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                          const newOpenDates = [...targetDates];
                          newOpenDates[index] = newValue;
                          setTargetDates(newOpenDates);
                        }}
                        disabled={!isOpenDateSelected}
                      />
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <RHFDatePicker
                minDate={
                  targetDates[index]
                    ? new Date(
                        targetDates[index]!.getTime() + 24 * 60 * 60 * 1000
                      )
                    : undefined
                }
                name={`openings.${index}.closeDate`}
                outerLabel="Close Date"
                disabled={!isTargetStartDateSelected}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <RHFAutocompleteAsync
                outerLabel="Close Reason"
                name={`openings.${index}.closeReason`}
                getOptionLabel={(option: any) => option?.closeReason}
                disableCloseOnSelect={false}
                apiQuery={apiQuery}
                placeholder="Select"
                limitTags={1}
                multiple={false}
                transformResponse={(res) => res?.closeReason}
              />
            </Grid>
            {openingsCustomFields?.map((items) => (
              <Grid item md={items?.md} xs={12} key={items?.id}>
                {items?.component && (
                  <items.component
                    {...items.componentProps}
                    name={`openings.${index}.customFields[${items?.id}]`}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        );
      })}
    </>
  );
}

export const JobOpenings = memo(Openings);

import { Grid, Box } from "@mui/material";
import React from "react";
import { fieldsInfo } from "./event-details-form-data";
import { GenFormField } from "@components/form-fields-generator";
import { useLazyGetAllProspectPoolQuery } from "@services/crm/events/crm-events-api";
import { RHFAutocompleteAsync, RHFDatePicker } from "common";

export function EventDetailsFields(props: any): JSX.Element {
  const { watch, isDisabled } = props;
  const prospect = useLazyGetAllProspectPoolQuery();
  const watchShowAge = watch("prospectPool");
  const startDate = watch("startDate");
  const transformData = (res) => {
    if (watchShowAge) {
      const filterData = res?.data.filter(
        (list) => list._id === watchShowAge._id
      );
      return filterData ? filterData[0]?.stages : [];
    }

    return [];
  };

  const getMinEndDate = () => {
    if (startDate) {
      const minEndDate = new Date(startDate);
      minEndDate.setDate(minEndDate.getDate() + 1); // Ensure minimum end date is one day after start date
      return minEndDate;
    }
    return new Date(); // Default to current date if start date is not selected
  };

  return (
    <Grid container item sm={12} md={6}>
      {/* Dynamically Generated Fields  */}
      {fieldsInfo.map((item: any, index: number) => {
        const itemsProps = item?.OuterConProps ? item?.OuterConProps : {};
        if (item.name === "prospectStage") {
          return (
            <Box key={index}  width="100%">
              <RHFAutocompleteAsync
                multiple={false}
                name={item.name}
                placeholder="Select Option"
                outerLabel={item.outerLabel}
                apiQuery={prospect}
                getOptionLabel={(option: any) => option?.stage}
                transformResponse={transformData}
                disabled={isDisabled}
              />
            </Box>
          );
        }
        if (item.name === "endDate") {
          return (
            <Box key={index}  width="100%">
              <RHFDatePicker
                minDate={getMinEndDate()}
                name={item.name}
                outerLabel={item.outerLabel}
                disabled={isDisabled}
              />
            </Box>
          );
        }

        return (
          <GenFormField
            key={index}
            item={item}
            isSubmitting={false}
            disabled={isDisabled}
            {...itemsProps}
          />
        );
      })}
    </Grid>
  );
}

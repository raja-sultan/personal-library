import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { memo, useState } from "react";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { RHFCustomSelect, RHFDateRangePicker } from "common";
import {
  EthnicityData,
  GenderData,
  employmentStatus,
  managerData,
  maritalStatusData,
  onboardingCoordinatorData,
  personalPronounsData,
  timeZoneData,
} from "./filter-data";
import { useGetDepartmentsListQuery } from "@services/settings/department/department-api";
import { useGetLocationListQuery } from "@services/settings/location/location-api";

export const FilterFields = memo(function FilterFields({
  index,
  control,
  openStates,
  handleAutocompleteOpenChange,
  filterListValue,
  optionList,
  remove,
  onChanged,
}: any) {
  const [getNewValue, setGetNewValue] = useState();

  const { data: getDepartmentList } = useGetDepartmentsListQuery({
    limit: 10,
    offset: 0,
  });
  const departmentArray = getDepartmentList?.data?.departments;

  const { data: getLocationList } = useGetLocationListQuery({
    limit: 10,
    offset: 0,
  });
  const locationArray = getLocationList?.data?.office;

  const transformData = (array, labelKey, idKey, valueKey): any =>
    array?.map((obj) => {
      const { [idKey]: _id, [labelKey]: label, ...rest } = obj;
      return {
        label: label?.toUpperCase(),
        id: _id,
        value: obj[valueKey]?.toLowerCase(),
        ...rest,
      };
    });

  const locationData = transformData(
    locationArray,
    "officeName",
    "_id",
    "officeName"
  );
  const departmentData = transformData(
    departmentArray,
    "departmentName",
    "_id",
    "departmentName"
  );

  // const locationData = locationArray?.map((obj) => {
  //   const { _id, officeName, ...rest } = obj;
  //   return {
  //     label: officeName?.toUpperCase(),
  //     id: _id,
  //     value: officeName?.toLowerCase(),
  //     ...rest,
  //   };
  // });
  // const departmentData = departmentArray?.map((obj) => {
  //   const { _id, departmentName, ...rest } = obj;
  //   return {
  //     label: departmentName?.toUpperCase(),
  //     id: _id,
  //     value: departmentName?.toLowerCase(),
  //     ...rest,
  //   };
  // });

  const optionsHandler = (value: any): any => {
    switch (value) {
      case "Department":
        return departmentData;
      case "Employment status":
        return employmentStatus;
      case "Ethnicity":
        return EthnicityData;
      case "Gender":
        return GenderData;
      case "Location":
        return locationData;
      case "Manager":
        return managerData;
      case "Martial Status":
        return maritalStatusData;
      case "Onboarding Coordinator":
        return onboardingCoordinatorData;
      case "personal Pronouns":
        return personalPronounsData;
      case "Time Zone":
        return timeZoneData;
    }
  };

  return (
    <Grid key={index} container spacing={2} my={0.5}>
      <Grid item xs={10} lg={11}>
        <Grid container spacing={1}>
          <Grid item xxs={10} xs={12} lg={6}>
            <Controller
              name={`filterList[${index}].filterLabel`}
              control={control}
              render={(form) => (
                <Stack gap="0.6rem">
                  <Autocomplete
                    {...form.field}
                    id={`filterList[${index}].filterLabel`}
                    options={optionList}
                    getOptionLabel={(option) => option.label ?? option}
                    isOptionEqualToValue={(option: any, newValue: any) =>
                      option.id === newValue.id
                    }
                    autoComplete
                    open={openStates[index] || false}
                    onOpen={() => {
                      handleAutocompleteOpenChange(index, true);
                    }}
                    onClose={() => {
                      handleAutocompleteOpenChange(index, false);
                    }}
                    noOptionsText="No option"
                    onChange={(e: React.SyntheticEvent, newValue: any) => {
                      form.field.onChange(newValue);
                      onChanged(e, newValue, form.field.onChange);
                      setGetNewValue(newValue?.label);
                    }}
                    renderOption={(propss, option: any) => {
                      return (
                        <li {...propss} key={option.id}>
                          {option.label}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={Boolean(form.fieldState.error)}
                        helperText={form.fieldState.error?.message}
                      />
                    )}
                  />
                </Stack>
              )}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            {filterListValue[index].filterLabel?.value === "startDate" ||
            filterListValue[index].filterLabel?.value === "dob" ||
            filterListValue[index].filterLabel?.value === "dateofleaving" ||
            filterListValue[index].filterLabel?.value === "transmissiondate" ? (
              <RHFDateRangePicker name={`filterList[${index}].filterValue`} />
            ) : (
              <RHFCustomSelect
                name={`filterList[${index}].filterValue`}
                placeholder="Select"
                options={optionsHandler(getNewValue)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2} lg={1}>
        <IconButton
          onClick={() => {
            remove(index);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
});

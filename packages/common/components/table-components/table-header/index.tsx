"use client";

import { useState } from "react";
import {
  Checkbox,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Autocomplete,
  Button,
  FormControlLabel,
  Chip,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import type { TableHeaderProps } from "./table-header.types";
import { debounce } from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AsyncMultiselectRenderComponent(
  props: any,
  queryParams: any,
  setParams: any,
  onChangedMain: any,
  params: any
): JSX.Element {
  const {
    apiQuery,
    queryKey = "search",
    multiple = true,
    getOptionId = (option: any) => option?._id,
    getOptionLabel = (option: any) => option?.departmentName,
    isOptionEqualToValue = (option: any, newValue: any) =>
      option._id === newValue?._id,
    EndIcon,
    StartIcon,
    externalParams = {},
    transformResponse = (res: any) => res,
    renderTags = (tagValue, getTagProps) => {
      return tagValue?.map((option: any, index) => (
        <Chip
          {...getTagProps({ index })}
          key={getOptionId(option)}
          label={getOptionLabel(option)}
        />
      ));
    },
  } = queryParams;
  //async works
  const [open, setOpen] = useState(false);
  // api
  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;
  const apiData = transformResponse(data);
  // debounce
  const triggerDebounce = debounce((newInputValue) => {
    trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
  }, 600);
  const AsyncMultiselectChangeHandler = (name: any, newValue: any) => {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: newValue };
      onChangedMain(updatedParams);
      return updatedParams;
    });
  };

  return (
    <Autocomplete
      sx={{
        "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
          py: 0.85,
        },
      }}
      multiple={multiple}
      size="small"
      open={open}
      value={params[props.FieldProps.name]}
      limitTags={1}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No option"
      options={apiData ?? []}
      disableCloseOnSelect
      onOpen={() => {
        trigger({
          params: { ...externalParams },
        });
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      loading={isLoading || isFetching}
      onChange={(e: React.SyntheticEvent, newValue: any) => {
        AsyncMultiselectChangeHandler(props.FieldProps.name, newValue);
      }}
      onInputChange={(event, newInputValue) => {
        triggerDebounce.cancel();
        if (newInputValue.trim()) triggerDebounce(newInputValue);
      }}
      filterOptions={(x) => x}
      renderOption={(renderOptions, option: any, { selected }) => {
        return (
          <li {...renderOptions} key={getOptionId(option)}>
            <Checkbox
              key={getOptionId(option)}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel(option)}
          </li>
        );
      }}
      renderTags={renderTags}
      renderInput={(renderInputparams) => (
        <TextField
          {...renderInputparams}
          variant="outlined"
          label={props.FieldProps.label}
          InputProps={{
            ...renderInputparams.InputProps,
            endAdornment: (
              <>
                {isLoading || isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {EndIcon ?? renderInputparams.InputProps.endAdornment}
              </>
            ),
            ...(StartIcon && { startAdornment: StartIcon }),
          }}
        />
      )}
    />
  );
}

const getDefaultParams: any = ({ tableHeaderData }: any) => {
  const defaultParams: any = {};
  tableHeaderData.forEach((data: any) => {
    if (data.type === "asyncMultiselect") {
      defaultParams[data.FieldProps.name] = null;
    } else if (data.type === "checkbox") {
      defaultParams[data.FieldProps.name] = false;
    } else
      defaultParams[data.FieldProps.name] =
        data.type === "multiselect" ? [] : "";
  });
  return defaultParams;
};

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------
let timer: ReturnType<typeof setTimeout>;

export function TableHeader(props: TableHeaderProps): JSX.Element {
  const {
    tableHeaderData,
    onChanged = () => {
      return null;
    },
    debounceTimeout = 1000,
    filterButtonShow,
    filterButtonLabel,
    filterButtonProps,
    showClearFilterButton,
    gridProps,
  } = props;
  const [params, setParams] = useState<any>(
    getDefaultParams({ tableHeaderData })
  );
  const [show, setShow] = useState(!filterButtonShow);

  function changeHandler({ target: { name, value } }: any, type: string): any {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };

      // Use debounce if search is updated
      clearTimeout(timer);

      if (type === "search") {
        timer = setTimeout(() => {
          onChanged(updatedParams);
        }, debounceTimeout);
      } else {
        onChanged(updatedParams);
      }

      return updatedParams;
    });
  }

  function autoCompleteChangeHandler(value: any, name: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };
      onChanged(updatedParams);
      return updatedParams;
    });
  }

  function dateChangeHandler(value: any, name: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };
      onChanged(updatedParams);
      return updatedParams;
    });
  }
  function checkBoxChangeHandler({ target: { name, checked } }: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: checked };
      onChanged(updatedParams);
      return updatedParams;
    });
  }

  function onClear(): void {
    const defaultParams = getDefaultParams({ tableHeaderData });
    setParams(defaultParams);
    onChanged(defaultParams);
  }

  return (
    <>
      {filterButtonShow && (
        <Button
          endIcon={
            show ? (
              <KeyboardArrowUpIcon
                sx={{
                  color: "text.primary",
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{
                  color: "text.primary",
                }}
              />
            )
          }
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
          sx={{
            color: "text.primary",
            border: `1px solid`,
            borderColor: "neutral.300",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "7px 12px",
          }}
          {...filterButtonProps}
        >
          {filterButtonLabel}
        </Button>
      )}
      {show && (
        <Grid container gap={2} sx={{ my: 2 }}>
          {tableHeaderData.map((data: any) => {
            if (data.type === "search") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={params[data.FieldProps.name]}
                    onChange={(e) => changeHandler(e, data.type)}
                    {...data.FieldProps}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              );
            } else if (data.type === "select") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={params[data.FieldProps.name]}
                    onChange={(e) => changeHandler(e, data.type)}
                    {...data.FieldProps}
                  >
                    {data?.options?.map(({ label, value }: any) => (
                      <MenuItem
                        key={value}
                        value={value}
                        sx={{ fontSize: "1.5rem" }}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              );
            } else if (data.type === "multiselect") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <Autocomplete
                    multiple
                    limitTags={1}
                    size="small"
                    fullWidth
                    value={params[data.FieldProps.name]}
                    options={data.options}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option: any, newValue: any) =>
                      option.value === newValue.value
                    }
                    noOptionsText="No option"
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option: any, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`chip${option.id}`}
                          label={option.label}
                        />
                      ));
                    }}
                    onChange={(e, value) => {
                      autoCompleteChangeHandler(value, data.FieldProps.name);
                    }}
                    renderOption={(prop, option: any, { selected }) => {
                      return (
                        <MenuItem
                          {...prop}
                          key={option.id}
                          sx={{ fontSize: "1.5rem" }}
                        >
                          <Checkbox
                            key={option.id}
                            icon={Icon}
                            checkedIcon={CheckedIcon}
                            sx={{ marginRight: 1 }}
                            checked={selected}
                          />
                          {option.label}
                        </MenuItem>
                      );
                    }}
                    renderInput={(param) => (
                      <TextField
                        {...param}
                        variant="outlined"
                        label={data.FieldProps.label}
                      />
                    )}
                    {...data?.FieldProps}
                  />
                </Grid>
              );
            } else if (data.type === "asyncMultiselect") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  {AsyncMultiselectRenderComponent(
                    data,
                    data.queryParams,
                    setParams,
                    onChanged,
                    params
                  )}
                </Grid>
              );
            } else if (data.type === "date") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <DatePicker
                    value={params[data.FieldProps.name]}
                    onChange={(value: any) => {
                      dateChangeHandler(value, data.FieldProps.name);
                    }}
                    minDate={
                      data.FieldProps.minDateName
                        ? params[data.FieldProps.minDateName]
                        : undefined
                    }
                    maxDate={
                      data.FieldProps.maxDateName
                        ? params[data.FieldProps.maxDateName]
                        : undefined
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true,
                        error: false,
                        ...data.FieldProps,
                      },
                    }}
                  />
                </Grid>
              );
            } else if (data.type === "checkbox") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <FormControlLabel
                    control={
                      <Checkbox checked={params[data.FieldProps.name]} />
                    }
                    onChange={(e) => {
                      checkBoxChangeHandler(e);
                    }}
                    {...data.FieldProps}
                  />
                </Grid>
              );
            }
            return null;
          })}
          {showClearFilterButton && (
            <Grid
              xs={12}
              md={3.5}
              lg={2}
              display="flex"
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              item
              ml="auto"
              mr={4}
              {...gridProps}
            >
              <Button
                onClick={onClear}
                sx={{ color: "primary.main" }}
                variant="text"
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                Clear Filters
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

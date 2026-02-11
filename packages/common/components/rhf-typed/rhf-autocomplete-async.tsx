// react
import { useState } from "react";
// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "lodash";
import { Checkbox, Chip } from "@mui/material";

// types
import type { Option, RHFAutocompleteAsyncProps } from "./rhf.types";

// mui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------

export function RHFAutocompleteAsync<
  FormValues extends FieldValues,
  TOption extends Option,
>({
  multiple = false,
  name,
  queryKey = "search",
  debounceTime = 500,
  label,
  options,
  apiState,
  trigger,
  control,
  limitTags = 2,
  getOptionLabel = (option: TOption) => option.name,
  ...other
}: RHFAutocompleteAsyncProps<FormValues, TOption>): JSX.Element {
  // states
  const [open, setOpen] = useState(false);

  // api states
  const { isLoading, isFetching } = apiState;

  // debounce
  const triggerDebounce = debounce((newInputValue: string) => {
    void trigger({ params: { [queryKey]: newInputValue } });
  }, debounceTime);

  // on change handler
  const onChanged = (
    e: React.SyntheticEvent,
    newValue: TOption | TOption[] | null,
    onChange: (...event: unknown[]) => void
  ): void => {
    onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Autocomplete
            {...form.field}
            multiple={multiple}
            id={name}
            open={open}
            autoComplete
            includeInputInList
            filterSelectedOptions
            noOptionsText="No option"
            options={options}
            limitTags={limitTags}
            disableCloseOnSelect
            {...other}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option: TOption, newValue: TOption) =>
              option.id === newValue.id
            }
            getOptionLabel={getOptionLabel}
            loading={isLoading || isFetching}
            onChange={(
              e: React.SyntheticEvent,
              newValue: TOption | TOption[] | null
            ) => {
              onChanged(e, newValue, form.field.onChange);
            }}
            onInputChange={(event, newInputValue) => {
              triggerDebounce.cancel();
              if (newInputValue.trim()) triggerDebounce(newInputValue);
            }}
            filterOptions={(x) => x}
            renderOption={(props, option: TOption, { selected }) => {
              return (
                <li {...props} key={option.id}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {getOptionLabel(option)}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option: TOption, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  label={getOptionLabel(option)}
                />
              ));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={label}
                error={Boolean(form.fieldState.error)}
                helperText={form.fieldState.error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading || isFetching ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}

// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
// @mui
import type { Option, RHFAutocompleteSyncProps } from "./rhf.types";
import { Autocomplete, Chip, TextField, Checkbox } from "@mui/material";
import { useState } from "react";

// mui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// ----------------------------------------------------------------------

export function RHFAutocompleteSync<
  FormValues extends FieldValues,
  TOption extends Option,
>({
  id,
  name,
  label,
  options,
  control,
  limitTags = 2,
  multiple = false,
  getOptionLabel = (option: TOption) => option.name,
  ...other
}: RHFAutocompleteSyncProps<FormValues, TOption>): JSX.Element {
  // states
  const [open, setOpen] = useState(false);

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
      render={(form) => (
        <Autocomplete
          {...form.field}
          id={id}
          multiple={multiple}
          limitTags={limitTags}
          options={options}
          getOptionLabel={getOptionLabel}
          autoComplete
          open={open}
          noOptionsText="No option"
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
          onChange={(
            e: React.SyntheticEvent,
            newValue: TOption | TOption[] | null
          ) => {
            onChanged(e, newValue, form.field.onChange);
          }}
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
            return tagValue.map((option: TOption, index: number) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={getOptionLabel(option)}
              />
            ));
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={label} />
          )}
        />
      )}
    />
  );
}

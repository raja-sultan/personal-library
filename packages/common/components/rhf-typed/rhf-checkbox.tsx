// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
// @mui
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import type {
  CheckboxOption,
  RHFCheckboxProps,
  RHFMultiCheckboxProps,
} from "./rhf.types";

// ----------------------------------------------------------------------

export function RHFCheckbox<FormValues extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  ...other
}: RHFCheckboxProps<FormValues>): JSX.Element {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              disabled={disabled}
              sx={(theme) => ({
                stroke: theme.palette.background.default,
                strokeWidth: 1,
              })}
            />
          )}
        />
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMultiCheckbox<
  FormValues extends FieldValues,
  TCheckboxOption extends CheckboxOption,
>({
  name,
  options,
  control,
  ...other
}: RHFMultiCheckboxProps<FormValues, TCheckboxOption>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: string): string[] => {
          if (field.value.includes(option))
            return field.value.filter(
              (selectedOption: string) => selectedOption !== option
            );

          return [...field.value, option];
        };

        return (
          <FormGroup>
            {options.map(({ label, value }: TCheckboxOption) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={field.value.includes(value)}
                    onChange={() => {
                      field.onChange(onSelected(value));
                    }}
                  />
                }
                label={label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

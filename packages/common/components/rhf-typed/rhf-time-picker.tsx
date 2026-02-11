// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

// @mui
import { TimePicker } from "@mui/x-date-pickers";
import type { RHFTimePickerProps } from "./rhf.types";

// ----------------------------------------------------------------------

export function RHFTimePicker<FormValues extends FieldValues>({
  name,
  label,
  control,
  fullWidth,
  ...other
}: RHFTimePickerProps<FormValues>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          {...other}
          slotProps={{
            textField: {
              helperText: error ? error.message : "",
              error: Boolean(error),
              fullWidth,
            },
          }}
          label={label}
        />
      )}
    />
  );
}

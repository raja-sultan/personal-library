// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
// @mui
import { DatePicker } from "@mui/x-date-pickers";
import type { RHFDatePickerProps } from "./rhf.types";

// ----------------------------------------------------------------------

export function RHFDatePicker<FormValues extends FieldValues>({
  name,
  label,
  control,
  fullWidth = false,
  ...other
}: RHFDatePickerProps<FormValues>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
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

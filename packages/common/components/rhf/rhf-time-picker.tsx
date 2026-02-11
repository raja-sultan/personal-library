// form
import { Controller } from "react-hook-form";

// @mui
import { TimePicker } from "@mui/x-date-pickers";
import { FormLabel, Stack } from "@mui/material";

// ----------------------------------------------------------------------

export function RHFTimePicker({ name, label, outerLabel, control, fullWidth, ...other }: any): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
          <TimePicker
            {...field}
            {...other}
            slotProps={{
              textField: {
                helperText: error ? error.message : "",
                error: Boolean(error),
                fullWidth,
                variant: "outlined",
                size: other?.size
              },
            }}
            label={label}
          />
        </Stack>
      )}
    />
  );
}

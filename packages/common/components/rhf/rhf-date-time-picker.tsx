// form
import { Controller, useFormContext } from "react-hook-form";

// @mui
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// ----------------------------------------------------------------------

export function RHFDateTimePicker({ name, label, ...other }: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          {...field}
          {...other}
          slotProps={{
            textField: {
              helperText: error ? error.message : "",
              error: Boolean(error),
              fullWidth: other.fullWidth,
            },
          }}
          label={label}
        />
      )}
    />
  );
}

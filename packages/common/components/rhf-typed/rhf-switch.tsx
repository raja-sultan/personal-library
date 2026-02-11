// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

// @mui
import { Switch, FormControlLabel } from "@mui/material";
import type { RHFSwitchProps } from "./rhf.types";

// ----------------------------------------------------------------------

export function RHFSwitch<FormValues extends FieldValues>({
  name,
  label,
  control,
  disabled,
  ...other
}: RHFSwitchProps<FormValues>): JSX.Element {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch disabled={disabled} checked={field.value} {...field} />
          )}
          {...other}
        />
      }
      {...other}
    />
  );
}

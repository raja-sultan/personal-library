import { FormLabel, Stack } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

export function RHFTelInput({
  name,
  outerLabel,
  variant = "outlined",
  readOnly = false,
  ...other
}: {
  name: string;
  outerLabel?: string;
  readOnly?: boolean;
  variant?: "outlined" | "filled" | "standard";
  [key: string]: any;
}): JSX.Element {
  const { control, setError, clearErrors, setValue } = useFormContext();

  const handleChange = (newPhone: string): void => {
    setValue(name, newPhone);
    if ((other.isOptional && !newPhone) || matchIsValidTel(newPhone)) clearErrors(name);
  };

  const validate = (newPhone: string): void => {
    if (!other.isOptional && !matchIsValidTel(newPhone))
      setError(name, { type: "error", message: "Invalid phone number." });
    else clearErrors(name);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
          <MuiTelInput
            {...field}
            error={Boolean(error)}
            helperText={error?.message}
            variant={variant}
            onChange={handleChange}
            onBlur={() => {
              validate(field.value);
            }}
            InputProps={{
              readOnly,
            }}
            {...other}
          />
        </Stack>
      )}
    />
  );
}

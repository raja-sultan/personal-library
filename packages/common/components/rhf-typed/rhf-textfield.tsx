// @mui
import { IconButton, InputAdornment, TextField } from "@mui/material";

// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { RHFTextFieldProps } from "./rhf.types";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ----------------------------------------------------------------------

export function RHFTextField<TFormValues extends FieldValues>({
  name,
  type = "text",
  variant = "outlined",
  readOnly = false,
  control,
  fullWidth,
  StartIcon,
  EndIcon,
  ...other
}: RHFTextFieldProps<TFormValues>): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const endAdornment =
    type === "password" ? (
      <InputAdornment position="end">
        <IconButton
          sx={{ color: "primary.main" }}
          aria-label="toggle password visibility"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ) : (
      EndIcon
    );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          error={Boolean(error)}
          helperText={error?.message}
          type={showPassword ? "text" : type}
          variant={variant}
          InputProps={{
            readOnly,
            endAdornment,
            startAdornment: StartIcon,
          }}
          {...other}
        />
      )}
    />
  );
}

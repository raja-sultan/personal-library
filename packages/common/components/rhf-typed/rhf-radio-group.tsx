// form
import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import type { RHFRadioGroupProps, RadioOption } from "./rhf.types";

// ----------------------------------------------------------------------

export function RHFRadioGroup<
  FormValues extends FieldValues,
  TRadioOption extends RadioOption,
>({
  name,
  options,
  disabled = false,
  control,
  ...other
}: RHFRadioGroupProps<FormValues, TRadioOption>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, field: { onChange }, fieldState: { error } }) => (
        <div>
          <RadioGroup
            {...field}
            row
            {...other}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;

              if (typeof newValue !== "string") return;
              if (newValue === "true") onChange(true);
              else if (newValue === "false") onChange(false);
              else onChange(newValue);
            }}
          >
            {options.map(({ value, label }: TRadioOption) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio disabled={disabled} />}
                label={label}
              />
            ))}
          </RadioGroup>

          {Boolean(error) && (
            <FormHelperText error sx={{ px: 2 }}>
              {error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

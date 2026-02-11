import type {
  FieldValues,
  // UseFormReturn,
  // SubmitHandler,
  Control,
  Path,
} from "react-hook-form";

import type { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import type {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps,
} from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import type { TextFieldVariants } from "@mui/material";

// ----------------------------------------------------------------------

export interface Option {
  id: number;
  name: string;
}

export interface RadioOption {
  label: string;
  value: string;
}
export interface CheckboxOption {
  label: string;
  value: string;
}

export type GetOptionLabelType<TOption> = (option: TOption) => string;

export type Trigger = LazyQueryTrigger<
  QueryDefinition<
    unknown,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      unknown,
      FetchBaseQueryMeta
    >,
    string,
    unknown,
    "api"
  >
>;

export interface RHFAutocompleteAsyncProps<
  FormValues extends FieldValues,
  TOption,
> {
  multiple?: boolean;
  name: Path<FormValues>;
  queryKey?: string;
  label: string;
  debounceTime?: number;
  options: TOption[];
  apiState: ApiState;
  limitTags?: number;
  trigger: Trigger;
  getOptionLabel?: GetOptionLabelType<TOption>;
  control: Control<FormValues>;
}

//
export interface RHFTextFieldProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  type?: string;
  label?: string;
  readOnly?: boolean;
  control: Control<FormValues>;
  fullWidth?: boolean;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  variant?: TextFieldVariants;
}

export interface RHFRadioGroupProps<
  FormValues extends FieldValues,
  TRadioOption,
> {
  name: Path<FormValues>;
  options: TRadioOption[];
  disabled?: boolean;
  control: Control<FormValues>;
}

export interface RHFSwitchProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  disabled?: boolean;
  control: Control<FormValues>;
}

export interface RHFCheckboxProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  disabled?: boolean;
  control: Control<FormValues>;
}

export interface RHFMultiCheckboxProps<
  FormValues extends FieldValues,
  TCheckboxOption,
> {
  name: Path<FormValues>;
  options: TCheckboxOption[];
  disabled?: boolean;
  control: Control<FormValues>;
}

export interface RHFRadioGroupProps<
  FormValues extends FieldValues,
  TRadioOption,
> {
  name: Path<FormValues>;
  options: TRadioOption[];
  disabled?: boolean;
  control: Control<FormValues>;
}

export interface RHFDatePickerProps<FormValues extends FieldValues>
  extends DatePickerProps<Date> {
  name: Path<FormValues>;
  label: string;
  fullWidth?: boolean;
  control: Control<FormValues>;
}

export interface RHFDateTimePickerProps<FormValues extends FieldValues>
  extends DateTimePickerProps<Date> {
  name: Path<FormValues>;
  label: string;
  fullWidth?: boolean;
  control: Control<FormValues>;
}

export interface RHFTimePickerProps<FormValues extends FieldValues>
  extends TimePickerProps<Date> {
  name: Path<FormValues>;
  label: string;
  fullWidth?: boolean;
  control: Control<FormValues>;
}

export interface RHFAutocompleteSyncProps<
  FormValues extends FieldValues,
  TOption,
> {
  id: string;
  multiple?: boolean;
  name: Path<FormValues>;
  label: string;
  options: TOption[];
  limitTags?: number;
  getOptionLabel?: GetOptionLabelType<TOption>;
  control: Control<FormValues>;
}

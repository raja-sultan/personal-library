import type { FC } from "react";
import type { FieldOtherProps, FormFieldsProps } from "./types";
import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFCustomSelect,
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "common";

function RTextField({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFTextField {...props} />;
}

function RTextFieldMultiline({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFTextField multiline rows={4} {...props} />;
}

function RDatePicker({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFDatePicker {...props} />;
}
function RSelect({ ...props }: FieldOtherProps): JSX.Element {
  return (
    <RHFSelect {...props}>
      {props?.options?.map((option: string) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </RHFSelect>
  );
}

function RSelectV2({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFCustomSelect {...props} />;
}

function RRadioGroup({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFRadioGroup {...props} />;
}

function RCheckbox({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFCheckbox {...props} />;
}

function RSwitch({ ...props }: FieldOtherProps): JSX.Element {
  return <RHFSwitch {...props} />;
}

function RAsyncMultiselect({ ...props }: FieldOtherProps): JSX.Element {
  const apiQuery = props.apiQuery();
  // console.log("OOO", props.options);
  delete props.options;
  delete props.apiQuery;

  return <RHFAutocompleteAsync {...props} apiQuery={apiQuery} />;
}

const NULL: FC<FieldOtherProps> = () => null;

const FormFieldComponents = {
  TEXT: RTextField,
  TEXT_MULTILINE: RTextFieldMultiline,
  DATE_PICKER: RDatePicker,
  SELECT: RSelect,
  SELECT_V2: RSelectV2,
  RADIO: RRadioGroup,
  CHECKBOX: RCheckbox,
  SWITCH: RSwitch,
  ASYNC_MULTISELECT: RAsyncMultiselect,
  NULL,
};

function FormField({ fieldType, ...props }: FormFieldsProps): JSX.Element {
  const FFieldCom = FormFieldComponents[fieldType];
  return <FFieldCom {...props} />;
}

export default FormField;

export interface FieldTypesProps {
  fieldType:
    | "TEXT"
    | "TEXT_MULTILINE"
    | "TEXT_MULTILINE_TWO_LINES"
    | "DATE_PICKER"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"
    | "NULL"
    | "SWITCH"
    | "ASYNC_MULTISELECT"
    | "SELECT_V2";
}

export interface FieldOtherProps extends React.HTMLProps<HTMLDivElement> {
  options?: string[];
  outerLabel?: string;
  queryKey?: string;
  getOptionLabel?: (option: any) => string;
  apiQuery?: any;
}

export interface FormFieldsProps extends FieldTypesProps, FieldOtherProps {}

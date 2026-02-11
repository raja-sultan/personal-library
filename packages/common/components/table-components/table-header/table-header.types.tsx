import type {
  ButtonProps,
  GridProps,
  SelectProps,
  TextFieldProps,
} from "@mui/material";

interface FieldProps {
  name: string;
  label: string;
  minDateName?: string; // Adding minDateName property
}
export interface tableHeaderData {
  type:
    | "search"
    | "select"
    | "multiselect"
    | "checkbox"
    | "date"
    | "asyncMultiselect";
  FieldProps?: TextFieldProps | SelectProps | FieldProps;
  options?: {
    label?: string;
    value?: string;
  }[];

  queryParams?: any;
}

export interface TableHeaderProps {
  tableHeaderData: tableHeaderData[];
  onChanged?: (e: any) => void;
  showClearFilterButton?: boolean;
  debounceTimeout?: number;
  filterButtonShow?: boolean;
  filterButtonLabel?: string;
  filterButtonProps?: ButtonProps;
  gridProps?: GridProps;
}

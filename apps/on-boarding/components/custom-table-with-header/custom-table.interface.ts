import type React from "react";
import type { SxProps, TextFieldProps } from "@mui/material";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";

export interface TablePrimaryHeaderProps {
  removeMargin?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface TableSecondaryHeaderProps {
  handleSearch?: (value: string) => void;
  searchDelayTime?: number;
  searchProps?: TextFieldProps;
  actions?: React.ReactNode;
}

export interface CustomTableWithHeaderProps {
  primaryHeader?: boolean;
  primaryHeaderProps?: TablePrimaryHeaderProps;
  secondaryHeader?: boolean;
  secondaryHeaderProps?: TableSecondaryHeaderProps;
  tableProps?: CustomTableProps;
  children?: React.ReactNode;
  hideTable?: boolean;
  tableWrapperSX?: SxProps;
}

import type { CardProps, SxProps } from "@mui/material";
import type React from "react";

export interface Header {
  hideBackIcon?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onBack?: () => void;
  divider?: boolean;
  sx?: SxProps;
  actions?: React.ReactNode;
}
export interface SubHeader {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: SxProps;
  rootSxCardSubHeader?: SxProps;
}

export interface CardWrapper {
  children?: React.ReactNode;
  header?: boolean;
  subHeader?: boolean;
  cardHeader?: Header;
  cardSubHeader?: SubHeader;
  cardProps?: CardProps;
  cardContentProps?: SxProps;
}

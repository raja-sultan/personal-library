import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export interface SignUpFormTypes {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number | string;
  allowedCompany: string[];
  companyName: any;
  companySize: string | null;
  country: string | null;
  companyNo: string | number;
  companyAddress: string;
  postalCode: string | number;
}

export interface StepsTypes {
  label: string;
  component: JSX.Element;
  schema: any;
}
export interface CustomSxProps {
  formLabel?: SxProps<Theme>;
  helperTextSize?: SxProps<Theme>;
  linkStyle?: CSSProperties;
}

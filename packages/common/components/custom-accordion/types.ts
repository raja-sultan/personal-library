import type { ButtonProps } from "@mui/material";

export interface CustomAccordionProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  sx?: any;
  others?: any;
  inlineHeaderRequired?: boolean;
  handleSubmit?: any;
  buttonTitle?: string;
  showBtn?: boolean;
  disabled?: any;
  submitButtonProps?: ButtonProps;
  expended?: any;
}

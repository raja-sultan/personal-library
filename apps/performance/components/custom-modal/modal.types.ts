import type React from "react";
import type { ButtonProps, TypographyProps } from "@mui/material";

export interface ModalProps {
  maxWidth?: "xl" | "lg" | "md" | "sm" | "xs";
  isLoading?: boolean;
  open?: boolean;
  onClose?: () => void;
  headerIcon?: React.ReactNode;
  title?: React.ReactNode;
  message?: React.ReactNode;
  acceptText?: string;
  acceptButtonProps?: ButtonProps;
  onAccept?: () => void;
  customAcceptComponent?: React.ReactNode;
  rejectText?: string;
  onReject?: () => void;
  hideFooter?: boolean;
  children?: React.ReactNode;
  titleProps?: TypographyProps;
  hideCancelBtn?: boolean;
}

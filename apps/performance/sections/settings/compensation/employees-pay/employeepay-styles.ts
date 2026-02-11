import { type Theme } from "@mui/material";

export const styles = {
  bulletPointStyle: (theme: Theme) => ({
    background: theme.palette.primary.lightest,
    height: "32px",
    borderRadius: "50%",
    paddingTop: "3px",
    paddingInline: "1.1rem",
  }),
  filePreviewStyle: (theme: Theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.palette.neutral[100]}`,
    borderRadius: "10px",
    padding: "10px 16px",
  }),
  iconStyle: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.primary.lightest,
    padding: "8px",
    borderRadius: "50%",
  }),
};

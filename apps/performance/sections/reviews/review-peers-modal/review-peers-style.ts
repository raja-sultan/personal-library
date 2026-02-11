import type { Theme } from "@mui/material";

export const styles = {
  avatarStyle: (theme: Theme) => ({
    background:
      theme.palette.mode === "dark"
        ? theme.palette.neutral[800]
        : theme.palette.neutral[100],
    width: "45px",
    height: "45px",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.neutral[100]
        : theme.palette.neutral[700],
    fontSize: "2.0rem",
    fontWeight: 600,
  }),
};

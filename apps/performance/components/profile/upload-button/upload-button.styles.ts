import type { Theme } from "@mui/system";

export const styles = {
  updateButtonStyle: (theme: Theme) => ({
    all: "unset",
    cursor: "pointer",
    color: theme.palette.mode === "dark" ? theme.palette.neutral[500] : theme.palette.neutral[900],
    "&:hover": { background: "transparent" },
  }),
  menuItemStyle: (theme: Theme) => ({
    padding: "5px 22px",
    fontSize: "16px",
    color: theme.palette.mode === "dark" ? theme.palette.neutral[500] : theme.palette.neutral[900],
    "&:hover": {
      background: "transparent",
    },
  }),
};

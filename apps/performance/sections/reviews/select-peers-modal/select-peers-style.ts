import type { Theme } from "@mui/material";

export const styles = {
  alertWrapper: {
    backgroundColor: "#E1EFFE",
    display: "flex",
    gap: "7px",
    p: "14px 12px",
    mt: 2,
    borderRadius: "6px",
    mb: 6,
  },
  alertHeading: (theme: Theme) => ({
    color: theme.palette.neutral[700],
    fontSize: 14,
  }),
};

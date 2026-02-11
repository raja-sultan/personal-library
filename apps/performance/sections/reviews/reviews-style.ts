import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

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

  reviewsActionBtn: ({ palette: { neutral } }: Theme) => ({
    color: ThemeModeColor(neutral[600], neutral[400]),
    borderColor: ThemeModeColor(neutral[300], neutral[400]),
    "&:hover": {
      borderColor: ThemeModeColor(neutral[300], neutral[400]),
    },
  }),
};

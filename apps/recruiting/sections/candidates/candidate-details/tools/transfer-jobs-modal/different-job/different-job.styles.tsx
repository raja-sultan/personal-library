import type { Theme } from "@mui/material";

export const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700 },
    maxHeight: { xs: 550, sm: "auto" },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
  },
  transferWrapper: (theme: Theme) => ({
    backgroundColor: theme.palette.neutral[50],
    p: 2,
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
    mb: 2,
    borderRadius: "8px",
  }),
  jobOneStyling: {
    backgroundColor: "error.lightest",
    px: 4,
    py: 1,
    borderRadius: "6px",
    mt: { xs: 1, sm: 0 },
  },
  jobTwoStyling: {
    backgroundColor: "primary.lightest",
    color: "primary.main",
    px: 4,
    py: 1,
    borderRadius: "6px",
    mt: { xs: 1, sm: 0 },
  },
  arrowIcon: {
    color: "primary.main",
    transform: {
      xs: "rotate(90deg)",
      sm: "rotate(360deg)",
    },
    mt: { xs: 1, sm: 0 },
  },
};

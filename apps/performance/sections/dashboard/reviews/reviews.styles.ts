import { type Theme } from "@mui/material";

export const styles = {
  main: {
    padding: "10.3px 18px",
    position: "relative",
    "@media (max-width:380px)": {
      padding: "0px 12px",
    },
    "& .apexcharts-tooltip": (theme: Theme) => ({
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.neutral[400] : theme.palette.neutral[900],
      color: theme.palette.mode === 'dark' ? theme.palette.neutral[500] : theme.palette.neutral[900]
    }),
  },

  title: {
    position: { xs: "none", md: "absolute" },
    top: "18px",
    fontSize: "2.4rem",
    fontWeight: 600,
  },
  content: {
    textAlign: "center",
  },
};
import type { Theme } from "@mui/material";

export const styles = {
  cardWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "center",
  },
  userTextField: {
    my: 3,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 2,
    width: "100%",
    maxWidth: "320px",
  },
  userData: (theme: Theme) => ({
    borderTop: `1px solid ${theme.palette.neutral[100]}`,
    borderBottom: `1px solid ${theme.palette.neutral[100]}`,
    mt: 2,
    py: 1.5,
    px: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  headsDepartment: (theme: Theme) => ({
    color: theme.palette.mode === "dark" ? theme.palette.neutral[200] : theme.palette.neutral[800],
    fontWeight: 400,
  }),
  jobRole: (theme: Theme) => ({
    color: theme.palette.mode === "dark" ? theme.palette.neutral[100] : theme.palette.neutral[500],
    fontWeight: 400,
  }),
  desc: (theme: Theme) => ({ pt: '5px', fontWeight: 400, color: theme.palette.mode === 'dark' ? theme.palette.neutral[200] : theme.palette.neutral[500] })
};

import { type Theme } from "@mui/material";

export const styles = {
  tableWrapper: ({ palette: { neutral, mode, common } }: Theme) => ({
    "& thead tr:nth-child(1) > th": {
      fontWeight: 700,
      color: neutral[600],
      fontSize: "14px",
      backgroundColor: "#F9FAFB",
      padding: "10px",
      "&:nth-child(1)": {
        border: `1px solid #F2F4F7`,
      },
      "&:nth-child(2)": {
        border: `1px solid #F2F4F7`,
      },
    },
    "& thead tr:nth-child(2) > th": {
      fontWeight: 600,
      color: neutral[500],
      fontSize: "14px",
      padding: "24px 44px",
      textAlign: "start",
      whiteSpace: "nowrap",
      borderBottom: `1px solid ${neutral[100]}`,
      textTransform: "capitalize",
      background: mode === "light" ? common.white : neutral[900],
      "&:nth-child(1)": {
        paddingLeft: "24px",
      },
    },
    "& .table_body tr td": {
      padding: "22px 44px",
      whiteSpace: "nowrap",
      borderBottom: `1px solid ${neutral[100]}`,
      background: mode === "light" ? common.white : neutral[900],
      "&:nth-child(1)": {
        paddingLeft: "24px",
      },
    },
  }),
  currentPageBox: {
    display: "flex",
    my: "15px",
    px: "25px",
    alignItems: "center",
  },
  tableContainer: (theme: Theme) => ({
    "&::-webkit-scrollbar": {
      width: 10,
      height: 10,
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2,
    },
    mt: theme.palette.mode === "dark" ? 0.5 : 0,
    backgroundColor: theme.palette.mode === "light" ? "#F8FCFF" : theme.palette.grey[800],
  }),
  currentPage: (theme: Theme) => ({
    color: theme.palette.grey[600],
    fontSize: "12px",
    fontFamily: theme.typography.fontFamily,
  }),
  pagination: (theme: Theme) => ({
    ".Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "#FFFFFF",
    },
  }),
  error: (theme: Theme) => ({
    background: theme.palette.background.default,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  }),
};

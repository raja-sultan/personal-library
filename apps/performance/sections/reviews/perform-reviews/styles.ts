import { alpha, type Theme } from "@mui/material";

export const styles = {
  topCard: {
    mb: "2.4rem",
    "& .custom_card_header": { textTransform: "capitalize" },
  },
  leftCard: {
    px: 0,
    height: "100%",
    maxHeight: "calc(100vh - 230px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
    "& .content_wrapper": { px: 0 },
  },
  rightCard:{
    height: "100%",
    maxHeight: "calc(100vh - 230px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
  },
  accordionSummary: {
    p: "8px 24px",
    "& .content": {
      margin: "0 !important",
      minHeight: "unset",
      gap: "16px",
    },
    "&.summary_expanded": { m: 0, minHeight: "48px", fontWeight: 600 },
  },
  accordion: (theme: Theme) => ({
    m: 0,
    borderRadius: 0,
    boxShadow: "none",
    "&.expanded": { margin: 0, "&:hover": { background: "none" } },
    "&._root::before": { background: "none" },
    "&._root:first-of-type, &._root:last-of-type": {
      borderRadius: 0,
    },
    "&:hover": { background: alpha(theme.palette.primary.light, 0.2) },
    "& .acc_Detail .accordion_link": {
      fontSize: "14px",
      color:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[400]
          : theme.palette.neutral[900],
    },
    "& .acc_Detail": {
      padding: 0,
    },
  }),
  userWrapper: (theme: Theme) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",
    p: "13px 24px",
    position: "relative",
    "&.active": {
      background: alpha(theme.palette.primary.light, 0.2),
      position: "relative",
      "&::before": {
        position: "absolute",
        content: `""`,
        left: 0,
        top: 0,
        height: "100%",
        width: "5px",
        background: theme.palette.primary.main,
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      },
    },
  }),
};

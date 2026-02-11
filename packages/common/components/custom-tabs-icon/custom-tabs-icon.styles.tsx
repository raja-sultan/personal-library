import type { Theme } from "@mui/material";

export const styles = {
  tabRoot: (theme: Theme, MaxWidth: number, tabsRootSx) => ({
    display: "flex",
    alignItems: "center",
    // width: "fit-content",
    minHeight: 5,
    borderBottom: 1,
    borderRadius: 0.75,
    borderColor: "divider",
    "& .MuiTabs-flexContainer": {
      // gap: 0,
    },
    ...tabsRootSx,
  }),
  tab: (theme: Theme, tabRootSx) => ({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    padding: "4px 10px",
    borderRadius: "4px",
    minHeight: 32,
    gap: 0,
    color: theme.palette.text.primary,

    "&.MuiButtonBase-root": {
      width: "fit-content",
      marginLeft: "0px !important",
      minWidth: 160,
      mr: 0,
    },
    "&:hover": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    ...tabRootSx,
  }),
};
// "&.MuiTab-iconWrapper":{
//   mr:41,
//       },
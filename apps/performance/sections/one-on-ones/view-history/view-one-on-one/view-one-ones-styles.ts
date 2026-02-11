import { ThemeModeColor } from "@root/utils";
import type { Theme } from "@mui/material";

export const styles = {
  mainWrapper: {
    border: "1px solid #F2F4F7",
    borderRadius: "1rem",
    px: 2.4,
  },
  
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pb: 1.5,
    borderBottom: "1px solid #F2F4F7",
  },
  btnWrap: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    justifyContent: "flex-end",
  },
  tipsContent: {
    boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
    borderRadius: "1rem",
    p: 2.4,
  },
  detailsItems: {
    display: "flex",
    my: 1.5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsItemsTitle: ({ palette: { neutral } }: Theme) => ({
    color: ThemeModeColor(neutral[700], neutral[300]),
  }),
  tipsContentBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  joinCallBtn: {
    background: "primary.main",
    color: "error",
    ml: 1,
  },
  inputBox: { display: "flex", alignItems: "center", mt: -1.5 },
};

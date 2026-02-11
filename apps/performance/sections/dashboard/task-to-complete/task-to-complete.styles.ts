import { type Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export function taskToComplete(): any {
  return {
    wrapper: {
      flexGrow: 1,
    },
    gridWrapper: {
      maxHeight: "360px",
      padding: "18px 18px 11px 18px ",
      height: "100%",
      overflowY: "auto",
      width: "100%",
      "&::-webkit-scrollbar": {
        width: "6px",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#CACACA",
        borderRadius: "8px",
      },
    },
    innerCardGridWrap: {
      width: "100%"
    },
    innerCardWrap: (theme: Theme) => ({
      borderRadius: "14px",
      backgroundColor:
        theme.palette.mode === "dark" ? "#0E1320" : theme.palette.common.white,
      border:
        theme.palette.mode === "dark"
          ? "1px solid #0E1320"
          : "1px solid  #F2F4F7",
      padding: "18px",
      "@media(max-width: 480px)": {
        height: "100%",
      },
    }),
    boxWrap: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      color: ThemeModeColor("black", "white"),
      padding: "18px 18px 11px 18px ",
    },
    cardTitle: {
      color: ThemeModeColor("black", "white"),
    },
    cardDescription: {
      color: ThemeModeColor("black", "white"),
    },
    subTitle: {
      color: ThemeModeColor("black", "white"),
    },
    iconStyles: {
      fontSize: "16px",
    },
    linkStyles: {
      textDecoration: "none",
      color: "none",
    },
  };
}

import { ThemeModeColor } from "@root/utils";

export function myOneOnOneStyles(): any {
  return {
    wrapper: {
      flexGrow: 1,
      maxHeight: "360px",
      height: "100%",
      "@media (max-width: 1439px)": {
        height: "100% !important",
        maxHeight: "100% !important",
      },
    },
    textWrap: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 18px 0px 18px",
    },
    cardGridWrapper: {
      padding: "18px",
      "@media (max-width:380px)": {
        padding: "16px 10px !important",
      },
    },
    innerCardWrap: (theme) => ({
      borderRadius: "16px",
      backgroundColor:
        theme.palette.mode === "dark" ? "#0E1320" : theme.palette.common.white,
      border:
        theme.palette.mode === "dark"
          ? "1px solid #0E1320"
          : "1px solid  #F2F4F7",
      padding: "24px",
      height: "100%",
      cursor: "pointer",
      width: "100%",
      "@media (max-width:380px)": {
        padding: "16px 10px",
      },
    }),


    linkStyle: {
      textDecoration: "none",
      color: "none",
    },
    linkText: (theme) => ({
      color:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[400]
          : theme.palette.primary.main,
    }),
    innerCardContentWrap: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media (max-width: 480px)": {
        justifyContent: "center",
      },
    },
    topTitle: {
      "@media (max-width: 480px)": {
        textAlign: "center !important",
      },
    },
    listTitle: {
      color: ThemeModeColor("black", "white"),
      "@media (max-width: 480px)": {
        textAlign: "center",
      },
    },

    cardImgTitleWrap: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      "@media (max-width: 480px)": {
        flexDirection: "column",
        justifyContent: "center !important",
        alignItems: "center",
        paddingLeft: "0px !important",
      },
    },
    avatarTitle: {
      color: ThemeModeColor("#1D2939", "white"),
      "@media (max-width: 480px)": {
        textAlign: "center",
      },
      "@media (max-width: 360px)": {
        textAlign: "center",
      },
    },
    innerCardAvatarSubTitle: {
      color: ThemeModeColor("#667085", "white"),
      "@media (max-width: 480px)": {
        textAlign: "center",
      },
    },
    starIconWrap: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginLeft: "8px",
    },
    dateRatingWrap: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      "@media (max-width: 480px)": {
        justifyContent: "center",
      },
    },
    dateText: {
      color: ThemeModeColor("#667085", "white"),
      "@media (max-width: 480px)": {
        textAlign: "center",
      },
    },
    feedbackValue: {
      color: ThemeModeColor("black", "white"),
    },
  };
}

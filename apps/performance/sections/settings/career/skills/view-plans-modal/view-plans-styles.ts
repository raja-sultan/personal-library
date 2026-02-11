import type { Theme } from "@mui/material";

export const styles = {
  menuItem: {
    fontSize: "16px",
    fontWeight: 400,
  },
  addOptions: ({ palette: { neutral } }: Theme) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "16px",
    my: "16px",

    "& ._number": {
      color: neutral[500],
    },
    "& ._field": {
      flex: 1,
      border: `1px solid ${neutral[300]}`,
      borderRadius: "8px",
      padding: "7px 14px",
      height: "44px",
      color: neutral[900],
      " @media screen and (max-width: 420px)": {
        Width: "190px",
        whiteSpace: " nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    "& ._icon": {
      border: `1px solid ${neutral[300]}`,
      padding: "10px 10px 0px 10px",
      borderRadius: "8px",
      cursor: "pointer",
    },
  }),
  myMuiIcon: {
    transform: "rotate(180deg)",
  },

  ratingNumberWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  inputWithIconStyleWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    my: "16px",
  },
  ratingNumber: ({ palette: { neutral } }: Theme) => ({
    borderRadius: "50px",
    height: "48px",
    width: "48px",
    background: neutral[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: 600,
  }),
  commentWrapper: {
    my: "24px",
    display: "flex",
    justifyContent: "space-between",
    " @media screen and (max-width: 480px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  commentSwitchStyle: {
    " @media screen and (max-width: 480px)": {
      marginLeft: "0px",
      marginTop: "10px",
    },
  },
  gridIconStyle: {
    textAlign: "end",
    " @media screen and (max-width: 480px)": {
      marginLeft: "18px",
    },
  },
  modalInnerContentWrap: {
    display:"-webkit-box",
    width:"100%",
    overflowY: "hidden !important",
    overflowX: "auto !important",
    marginRight:"20px",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#CACACA",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "5px",
    },
    " @media screen and (max-width: 380px)": {
      height: "100%",
      padding: "0px",
      overflowY: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        display: "none",
      },
      "&::-webkit-scrollbar-track": {
        display: "none",
      },
    },
  },
  wrap_accordion: ({ palette: { neutral } }: Theme) => ({
    border: `1px solid ${neutral[100]}`, 
    marginBottom: "2rem",
    p:"2.rem",
    borderRadius:"1rem"
  }),
  wrap_accordion_details: {
    width: {xs:"100%",sm:"70%",md:"50%",lg:"40%",xl:"35%"},
    minWidth: {xs:"100%",sm:"70%",md:"50%",lg:"40%",xl:"30%"},
    maxWidth:"100%"
  },
  accordion_details: ({ palette: { neutral } }: Theme) => ({
    p: "1.6rem",
    background: neutral[50],
    borderRadius: "8px",
    border: `1px solid ${neutral[50]}`,
    fontSize: "18px",
    fontWeight:"600",
    color: neutral[900],
  }),

 
};

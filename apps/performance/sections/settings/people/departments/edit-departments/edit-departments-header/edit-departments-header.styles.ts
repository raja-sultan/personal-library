import { ThemeModeColor } from "@root/utils";
import type { Theme } from "@mui/material";

export function viewDepartmentsHeader(): any {
  return {
    viewDepartmentWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      "@media (max-width: 480px)": {
        padding:"1.6rem",
        textAlign:'center'
      },
    },
    buttonWrap: {
      display: "flex",
      flexWrap: "wrap",
      "@media (max-width: 480px)": {
        padding:"1.6rem",
        textAlign:'center'
      },
    },
    textFieldStyleWrap:{
      "@media (max-width: 480px)": {
        padding:"1.6rem",
        textAlign:'center'
      },
    },
    textFieldStyle: {
      background: ThemeModeColor("#fff", "color2"),
      maxWidth: "320px",
    },
    modalStyleWrap:{
      height:"100%"
    },
    modalStyle:{
      height:"100%"
    },
    textWrapIcon:{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      gap:"14px",
    },
    userData: (theme: Theme) => ({
      border: `1px solid ${theme.palette.neutral[100]}`,
      mt: 2,
      py: 2.5,
      px: 2,
      display: "flex",
      justifyContent: "space-between",
      alginItems: "center",
    }),
    userContent:{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      width:"100%",
    }
  };
}


import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export function membersModalStyles(): any {
  return {
    modalStyleWrap:{
      height:"100%"
    },
    modalStyle:{
      height:"100%"
    },
    buttonWrap: {
      display: "flex",
      flexWrap: "wrap",
      "@media (max-width: 480px)": {
        padding:"1.6rem",
        textAlign:'center'
      },
    },
    userData: (theme: Theme) => ({
      border: `1px solid ${theme.palette.neutral[100]}`,
      mt: 2,
      py: 1.2,
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
    },
    cancelBtn: (theme: Theme) => ({
      p: '7px 20px',
      color: ThemeModeColor(),
      background: ThemeModeColor(theme.palette.primary.contrastText, 'transparent'),
      border: `1px solid ${theme.palette.neutral[400]}`,
      '&:hover': {
          borderColor: theme.palette.neutral[400]
      }
  })
  };
}

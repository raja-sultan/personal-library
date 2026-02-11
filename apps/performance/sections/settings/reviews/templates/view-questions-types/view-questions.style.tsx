
import type { Theme } from "@mui/material";

export function viewQuestionsStyles(): any {
  return {
    submitButtonStyle: {
      display: "flex",
      justifyContent: "end",
      textAlign: "end",
      alignItems: "end",
    },
    list: {
      margin: 0,
      padding: {sm:"0px 0px 0px 2.5rem"},
      // paddingLeft: "2.5rem",
    },

    label: (theme: Theme) => ({
      fontSize: "20px",
      fontWeight: 600,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[400]
          : theme.palette.neutral[700],
    }),
    questionText: (theme: Theme) => ({
      fontSize: "18px",
      fontWeight: 600,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[400]
          : theme.palette.neutral[700],
    }),
  };
}

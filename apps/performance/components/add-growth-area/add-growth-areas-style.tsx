import type { Theme } from "@mui/material";

export const styles = {
  addOptions: ({ palette: { neutral } }: Theme) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "16px",
    my: "16px",


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
  scrollStyle: {
    maxHeight: "180px",
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  }



};

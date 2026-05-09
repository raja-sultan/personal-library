import { ThemeModeColor } from "@root/utils";
import type { Theme } from '@mui/material';

export function cardStyles(): any {
  return {
    card: ({ palette: { neutral } }: Theme) => ({
      borderRadius: "10px",
      border: `1px solid ${ThemeModeColor(neutral[100])}`,
      padding: 0,
      height:"100%"
    }),
    cardHeader: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      justifyContent: 'space-between',
      flexWrap: "wrap",
      padding: { md: '16px 24px', xs: '16px' },
    },
    cardSubHeader: {
      display: "flex",
      justifyContent: { md: "space-between", xs: "flex-start" },
      flexWrap: "wrap",
      gap: "15px",
      padding: { md: '16px 24px', xs: '16px' },
    },
    cardText: ({ palette: { neutral } }: Theme) => ({
      fontSize: "24px",
      fontWeight: 600,
      color: ThemeModeColor(neutral[900], neutral[100]),
    }),
    description: {
      fontSize: "14px",
      fontWeight: 400,
      color: ThemeModeColor(),
    },
    subHeaderChild: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
    },
  };
}

import type { Theme } from "@mui/material";

export function customKeyResultsStyles(): any {
  return {
    wrap_progress_bar: {
      height: "12px",
      mb: "8px",
      borderRadius: "50px",
      "& ._bar": { borderRadius: "5px" },
    },
    divider_style: {
      my: "1.5rem",
    },

    check_in_button: ({ palette: { neutral } }: Theme) => ({
      flex: 1,
      border: `1px solid ${neutral[300]}`,
      borderRadius: "6px",
      color: neutral[700],
    }),
    actions: ({ palette: { neutral } }: Theme) => ({
      border: `1px solid ${neutral[300]}`,
      borderRadius: "6px",
    }),
  };
}

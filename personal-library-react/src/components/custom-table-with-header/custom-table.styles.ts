import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

const commonFlex = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
};

export function customTableStyles(): any {
  return {
    tableWrapper: ({ palette: { neutral } }: Theme) => ({
      borderRadius: "10px",
      border: `1px solid ${neutral[100]}`,
      "& .MuiTableContainer-root": {
        background: "transparent",
      },
    }),
    tableHeaderWrapper:
      (children: boolean) =>
      ({ palette: { common } }: Theme) => ({
        padding: { md: "24px", xs: "18px" },
        backgroundColor: ThemeModeColor(common.white, "transparent"),
        "&._root": {
          boxShadow: "none",
          borderRadius: children ? "12px" : "12px 12px 0px 0px",
          border: "none",
        },
      }),
    tablePrimaryHeader: {
      ...commonFlex,
      justifyContent: "space-between",
    },
    headerChildren: commonFlex,
    tableSecondaryHeader: {
      ...commonFlex,
      justifyContent: "space-between",
    },
  };
}

import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export const styles = {
  card: ({ palette: { neutral, primary } }: Theme) => ({
    border: `0.1rem solid ${ThemeModeColor(neutral[200], neutral[800])}`,
    borderRadius: "0.8rem",
    padding: "1.6rem 0.8rem",
    display: "flex",
    alignItems: "center",

    "&:hover": { border: `0.1rem solid ${primary.main}` },
  }),
};

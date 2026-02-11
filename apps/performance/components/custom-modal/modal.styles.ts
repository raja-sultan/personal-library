import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export const styles = {
  dialogPaperStyle: { borderRadius: "16px", padding: "16px" },
  closeIcon: { ml: "auto", opacity: 0.5, cursor: "pointer" },
  head: { display: "flex", alignItems: "center", gap: "16px", mt: "10px" },
  cancelBtn: (theme: Theme) => ({
    width: { sm: "auto", xs: "100%" },
    p: "10px 20px",
    color: ThemeModeColor(),
    background: ThemeModeColor(theme.palette.primary.contrastText, "transparent"),
    border: `1px solid ${theme.palette.neutral[400]}`,
    "&:hover": {
      borderColor: theme.palette.neutral[400],
    },
  }),
};

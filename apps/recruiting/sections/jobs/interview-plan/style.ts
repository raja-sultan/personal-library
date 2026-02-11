import type { Theme } from "@mui/system";

export const addStageButton = (theme: Theme) => {
  return {
    border: `1px solid ${theme.palette.neutral[300]}`,
    px: 6,
    color: theme.palette.text.primary,
    height: 33,
    fontWeight: 600,
  };
};

export const stage = (theme: Theme) => {
  return {
    color: theme.palette.text.primary,
    pt: 1,
  };
};

export const addStageBox = (theme: Theme) => {
  return {
    border: `1px solid  ${theme.palette.neutral[300]}`,
    borderRadius: "8px",
    backgroundColor: theme.palette.background.secondary,
    display: "flex",
    justifyContent: "space-between",
  };
};

export const addInterviewButton = (theme: Theme) => {
  return {
    border: `1px solid ${theme.palette.neutral[300]}`,
    px: 5,
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 600,
    height: 35,
    borderRadius: "8px",
  };
};

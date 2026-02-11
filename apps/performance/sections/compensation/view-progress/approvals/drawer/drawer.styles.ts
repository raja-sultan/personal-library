import type { Theme } from "@mui/material";

export const styles = {
  drawerStyle: {
    borderTopLeftRadius: "24px",
    borderBottomLeftRadius: "24px",
    overflow: "visible",
    width: "38rem",
    paddingX: 2.4,
  },

  customCloseIcon: (theme: Theme) => ({
    position: "absolute",
    boxShadow: `0px 1px 2px 0px ${theme.palette.neutral[900]}`,
    "&:hover": {
      backgroundColor: "background.paper",
    },
    backgroundColor: "background.paper",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-20px",
  }),

  profileWrapper: {
    width: { xs: "280px", lg: "360px" },
    pt: 2.4,
  },
  closeIcon: { paddingY: "0", display: "block", ml: "auto" },

  currencyBtn1: (currencySymbol: string) => ({ palette: { neutral, common } }) => ({
    "&.MuiButtonGroup-firstButton": {
      borderColor: neutral[300],
    },
    border: `1px solid ${neutral[300]}`,
    background: currencySymbol === "£" ? "primary.main" : common?.white,
    color: currencySymbol === "£" ? common?.white : "neutral.700",
    "&:hover": { background: currencySymbol === "£" ? "primary.main" : common?.white },
    height: "53px"
  }),

  currencyBtn2: (currencySymbol: string) => ({ palette: { neutral, common } }) => ({
    border: `1px solid ${neutral[300]}`,
    background: currencySymbol === "%" ? "primary.main" : common?.white,
    color: currencySymbol === "%" ? common?.white : "neutral.700",
    "&:hover": { background: currencySymbol === "%" ? "primary.main" : common?.white },
    height: "53px"
  }),
  scroll: {
    overflowY: "scroll",
    height: "80vh",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
  slider: {
    width: "100%",
    // marginX: 2,
    "& .MuiSlider-rail": {
      height: "8px",
    },
    "& .MuiSlider-track": {
      height: "8px",
    },
    "& .MuiSlider-mark": {
      display: "none",
    },
    '& .MuiSlider-markLabel': {
      fontSize: '12px',
      color: 'neutral.500',
      transform: 'translateX(-100%)',
      '&[data-index="0"]': {
        transform: 'none'
      },
    }
  },
  noteWrapper: {
    my: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteBox: {
    my: 1,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: 1,
  },
  buttonGroup: {
    gap: 1,
    display: "flex",
    alignItems: "baseline",
    boxShadow: "rgba(16, 24, 40, 0.05)",
  },
};

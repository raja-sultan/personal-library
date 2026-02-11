import type { Theme } from "@mui/material";

export const styles = {
  drawerStyle: {
    borderTopLeftRadius: "24px",
    borderBottomLeftRadius: "24px",
    // overflow: "visible",
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
  notificationList: {
    py: "24px",
    display: "flex",
    alignItems: "flex-start",
    borderBottom: "1px solid",
    borderColor: "neutral.100",
  },
  viewAllBtn: { position: "absolute", bottom: "20px", right: "15px" },
  closeIcon: { display: "block", ml: "auto", padding:"0px" },
  profileWrapper: {
    width: { xs: "280px", lg: "360px" },
    p: "24px",
  },
  profileLinkIcon: ({ palette: { primary } }) => ({
    backgroundColor: primary.lightest,
    borderRadius: 5,
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  eyeIcon: {
    p: 1,
    borderColor: "neutral.300",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  },
  selectTemplateBtn: {
    px: 2,
    py: 1,
    borderColor: "neutral.300",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    color: "neutral.700",
  },
};

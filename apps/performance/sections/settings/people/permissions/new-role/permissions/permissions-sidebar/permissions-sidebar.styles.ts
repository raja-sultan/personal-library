// import type { Theme } from "@mui/material";

export const styles = {
  cardWrapper: {
    pt: 0,
    pb: 4.5,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    pl: 4,
    pr: 2.4,
    minHeight: 40,
    cursor: "pointer",
  },
  tabActive: {
    backgroundColor: "#F4F3FF",
    "&::after": {
      position: "absolute",
      content: "''",
      left: "20px",
      top: "50%",
      transform: "translate(-50%, -50%)",
      border: `2px solid`,
      borderColor: "primary.main",
      borderRadius: "50px",
      width: "8px",
      height: "8px",
    },
    "&::before": {
      position: "absolute",
      content: "''",
      left: 0,
      top: 0,
      height: "100%",
      minHeight: 40,
      width: "5px",
      backgroundColor: "primary.main",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },
  },
};

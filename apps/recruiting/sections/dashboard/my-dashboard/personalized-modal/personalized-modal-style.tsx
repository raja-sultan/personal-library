export const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700, lg: 1200 },
    height: { xs: "80vh", sm: "80vh", lg: "85vh" },
    // height: "min(100vh, 70rem)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
  },
  listStyling: {
    listStyleType: "disc",
    marginLeft: "10px",
    paddingLeft: "18px",
    mb: "-10px",
  },
  jobWrapper: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "background.default",
    mt: 2,
    p: 1.5,
    borderRadius: "8px",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "start", sm: "center" },
  },
};

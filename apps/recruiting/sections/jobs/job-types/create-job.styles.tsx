export const styles = {
  mainCardStyling: (theme) => ({
    boxShadow: theme.shadows[16],
    borderRadius: "10px",
    minHeight: { xs: "100vh", sm: "85vh", xl: "78vh" },
    outline: "none",
    border: "none",
    backgroundColor: "background.paper",
  }),
  topText: {
    fontWeight: 600,
    color: "text.primary",
  },
  topSubText: {
    fontWeight: 500,
    color: "text.secondary",
  },
  textWrapper: {
    p: { xs: "16px 0 0 16px", sm: "30px 0 0 30px" },
  },
  mainCardContent: {
    pt: { xs: 3, sm: 7, md: 6 },
  },
  mappedCardStyling: (theme) => ({
    boxShadow: theme.shadows[16],
    maxWidth: "659px",
    margin: "0 auto 30px auto",
    borderRadius: "10px",
    p: { xs: 0, sm: 1.5 },
    textAlign: { xs: "center", sm: "start" },
    outline: "none",
    border: "none",
    backgroundColor:
      theme.palette.mode === "light" ? "" : theme.palette.neutral[800],
  }),
  mappedCardContent: {
    display: { xs: "block", sm: "flex" },
    alignItems: "center",
    gap: { xs: 0, sm: 3 },
    "&.MuiCardContent-root": {
      p: 2,
    },
  },
  cardTitle: {
    mb: 1,
    fontWeight: 600,
    color: "text.primary",
  },
  cardDescription: {
    whiteSpace: { xs: "normal", sm: "pre-line" },
    fontWeight: 500,
    color: "text.secondary",
  },
};

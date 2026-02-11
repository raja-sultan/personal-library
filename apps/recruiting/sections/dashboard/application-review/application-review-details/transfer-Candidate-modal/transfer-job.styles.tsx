export const styles = {
  transferWrapper: {
    backgroundColor: "background.default",
    p: { xs: 2, sm: 3 },
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
    mb: 2,
  },
  jobOneStyling: {
    backgroundColor: "error.lightest",
    px: 4,
    py: 1,
    borderRadius: "6px",
    color: "error.main",
    mt: { xs: 1, sm: 0 },
  },
  jobTwoStyling: {
    backgroundColor: "primary.lightest",
    color: "primary.main",
    px: 4,
    py: 1,
    borderRadius: "6px",
    mt: { xs: 1, sm: 0 },
  },
  arrowIcon: {
    color: "primary.main",
    transform: {
      xs: "rotate(90deg)",
      sm: "rotate(360deg)",
    },
    mt: { xs: 1, sm: 0 },
  },
};

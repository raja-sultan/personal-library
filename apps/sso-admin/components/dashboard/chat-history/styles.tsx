export const styles = {
  mainCardStyling: (theme) => ({
    p: 3,
    borderRadius: "10px",
    boxShadow: theme.shadows[16],
  }),
  mainCardFlexStyling: () => ({
    display: "flex",
    justifyContent: "space-between",
    mb: 1.5,
  }),
  scrollStyling: () => ({
    overflowY: "auto",
    height: "38vh",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "gray",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "red",
      borderRadius: 2,
    },
  }),
  innerCardStyling: (theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "15px",
    border: "1px solid #E1E1E6",
    borderRadius: "8px",
    boxShadow: theme.shadows[16],
    margin: "auto",
  }),
};

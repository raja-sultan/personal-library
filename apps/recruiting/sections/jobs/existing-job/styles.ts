export const styles = {
  mainCardStyling: (theme) => ({
    // m: { xs: 0, sm: "30px", md: "30px 60px" },
    boxShadow: theme.shadows[16],
    borderRadius: "10px",
    p: 2,
  }),
  selectCardStyling: (theme) => ({
    borderRadius: "10px",
    boxShadow: theme.shadows[16],
    backgroundColor: "background.default",
    p: "30px 20px",
    mt: 2,
  }),
  tableCardStyling: () => ({
    borderRadius: "10px",
    p: 2,
    mt: 5,
  }),
};

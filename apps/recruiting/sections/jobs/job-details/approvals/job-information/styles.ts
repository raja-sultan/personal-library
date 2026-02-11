export const styles = {
  mainCardStyling: (theme) => ({
    m: { xs: 0, sm: "30px", md: "30px 60px" },
    boxShadow: theme.shadows[16],
    border: "1px solid var(#F2F4F7, #F2F4F7)",
    borderRadius: "10px",
    p: 2,
  }),
  selectCardStyling: (theme) => ({
    borderRadius: "10px",
    backgroundColor: "#F9FBFC",
    border: "1px solid #F9FBFC",
    boxShadow: theme.shadows[16],
    p: "30px 20px",
    mt: 2,
  }),
  tableCardStyling: (theme) => ({
    borderRadius: "10px",
    backgroundColor: "#F9FBFC",
    border: "1px solid #F9FBFC",
    boxShadow: theme.shadows[16],
    p: 2,
    mt: 5,
  }),
};

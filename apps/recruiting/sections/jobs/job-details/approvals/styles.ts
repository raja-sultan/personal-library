export const styles = {
  mainCardStyling: () => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    mb: 3,
    px: 1,
  }),
  innerCardStyling: (theme) => ({
    m: { xs: "10px 0px", sm: "30px", md: "30px 30px" },
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
  CardOverFlowStyling: () => ({
    px: 2,
    maxHeight: { xs: 250, sm: 330, lg: 350 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  }),
};

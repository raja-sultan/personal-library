export const styles = {
  mainCardStyling: (theme) => ({
    boxShadow: theme.shadows[16],
    border: "1px solid var(#F2F4F7, #F2F4F7)",
    borderRadius: "8px",
    width: "100%",
    p: 2,
    height: { xs: 80, sm: 100, lg: 130 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    // pr: 2,
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

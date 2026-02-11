export const styles = {
  mainCardStyling: () => ({
    px: 2,
    maxHeight: { xs: 300, sm: 350, lg: 400 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      // display: "none",
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  }),
};

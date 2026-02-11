export const styles = {
  mainCardStyling: () => ({
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

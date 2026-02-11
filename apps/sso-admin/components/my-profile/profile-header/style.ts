export const styles = {
  iconButtonStyling: () => ({
    position: "absolute",
    right: "20px",
    top: "20px",
    backgroundColor: "info.contrastText",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "neutral.100",
    },
  }),
  menuStyling: () => ({
    zIndex: 2,
    top: 5,
    p: 0,
    "& .MuiPaper-root": {
      borderRadius: "10px",
      minWidth: 190,
    },
  }),
  menuItemStyling: () => ({
    py: 0.8,
    fontSize: "16px",
  }),
};

export const styles = {
    mainWrapper: () => ({
      position: "relative",
      display: "inline-block",
      width: "auto",
    }),
    avatarStyling: () => ({
      width: "125px",
      height: "125px",
    }),
    iconButtonStyling: () => ({
      position: "absolute",
      bottom: "8px",
      right: "-5px",
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
      color: "gray",
      zIndex: 1,
      "&:hover": {
        color: "gray",
        background: "#fff",
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
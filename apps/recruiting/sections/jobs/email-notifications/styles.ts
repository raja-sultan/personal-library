export const styles = {
  mainsCardStyling: () => ({
    height: "90%",
    position: "relative",
    overflowY: "scroll",
  }),
  mainCardStyling: () => ({
    border: "1px solid var(#F2F4F7, #F2F4F7)",
    mb: 3,
    px: { md: 4, xs: 2 },
    py: 3,
    backgroundColor: "background.default",
    borderRadius: "10px",
    boxShadow: "none !important",
  }),
  innerCardStyling: () => ({
    display: "flex",
    justifyContent: "space-between",
    py: 2,
    px: 3,
  }),
  configureButtonStyling: () => ({
    fontSize: "14px",
    px: 6,
    py: 0.5,
    borderRadius: "10px",
    backgroundColor: "#7A5AF8",
  }),
  configureBackButtonStyling: () => ({
    fontSize: "14px",
    px: 6,
    py: 0.5,
    borderRadius: "10px",
    backgroundColor: "white",
    border: "1px solid black",
    color: "black",
  }),
  dividerStyling: () => ({ mt: 1, borderTop: "1px solid #D0D5DD" }),

};

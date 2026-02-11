export const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, xxl: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
  tableWrapper: {
    display: "flex",
    backgroundColor: "background.default",
    justifyContent: "space-between",
    p: 1,
    borderRadius: "5px",
    mt: 2,
    mb: 1,
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: { xs: "start", sm: "end" },
    gap: 2,
    my: 1,
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "end",
  },
};

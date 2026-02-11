export const styles = {
  mainWrapper: ({ editText, editButtons }) => ({
    height: editText || editButtons ? "90%" : "auto",
    position: "relative",
    overflowY: editText || editButtons ? "scroll" : "auto",
  }),
  cardStyling: (theme) => ({
    borderRadius: "10px",
    boxShadow: theme.shadows[16],
    border: "none",
    backgroundColor: "background.default",
  }),
  cardHeaderStyling: {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    mb: 1,
    flexDirection: { xs: "column", md: "row" },
  },
  headerText: {
    fontWeight: 500,
    color: "text.primary",
  },
  addButtonStyling: {
    borderRadius: "8px",
    fontSize: "14px",
    boxShadow: "none",
    minWidth: { xs: "auto", md: "182px" },
  },
  categoryTitle: {
    color: "text.secondary",
  },
  removeCategory: {
    p: 0,
    fontWeight: 400,
    mt: 1,
    color: "error.main",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  editButtonStyling: () => ({
    minWidth: { xs: "80px", sm: "150px", md: "182px" },
    borderRadius: "8px",
    fontSize: "14px",
    mt: { xs: 3, sm: 4 },
    boxShadow: "none",
  }),
  dividerStyling: (theme) => ({
    borderTop: `1px solid ${theme.palette.neutral[300]}`,
    width: "100%",
    mt: 1,
  }),
  AddAttribute: {
    borderRadius: "8px",
    minWidth: { xs: "auto", sm: "182px" },
  },
  saveButton: {
    borderRadius: "8px",
    ml: 2,
    boxShadow: "none",
    "&: hover": {
      boxShadow: "none",
    },
  },
  configureButtonStyling: {
    borderRadius: "8px",
    fontSize: "14px",
    boxShadow: "none",
    minWidth: { xs: "auto", md: "182px" },
  },
  bottomButtons: {
    display: "flex",
    justifyContent: "space-between",
    mt: 1,
    gap: { xs: 2, sm: 2 },
    alignItems: "center",
  },
  endButtons: {
    display: "flex",
    gap: { xs: 1, sm: 1 },
    alignItems: "center",
  },
  textFieldStyling: {
    minWidth: {
      xs: "250px",
      sm: "220px",
      lg: "274px",
    },
  },
  fieldArrayWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    mb: { xs: 1, sm: 2 },
  },
};

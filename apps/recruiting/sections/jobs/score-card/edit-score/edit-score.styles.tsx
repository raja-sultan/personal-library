export const styles = {
  dynamicFieldWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    mb: { xs: 0, sm: 2 },
    mt: { xs: 1.5, sm: 1 },
  },
  saveButtonStyling: {
    ml: { xs: 0, sm: 2 },
    borderRadius: "8px",
    minWidth: { xs: "100px", sm: "150px", lg: "182px" },
    mb: { xs: 2, sm: 3, md: 0 },
    mt: { xs: 2, sm: 1 },
    py: 1,
  },
  addAttributeButton: {
    borderRadius: "8px",
    mt: {
      xs: 2,
      sm: 1,
    },
    minWidth: { xs: "auto", sm: "182px" },
  },
  dividerStyling: (theme) => ({
    borderTop: `1px solid ${theme.palette.neutral[300]}`,
    width: "100%",
    mt: 3,
  }),
  textFieldStyling: {
    minWidth: {
      xs: "250px",
      sm: "220px",
      lg: "274px",
    },
  },
};

export const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600, md: 650 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, lg: 650, xxl: 700 },
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
  typoStyling: {
    color: "primary.main",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: { xs: "start", sm: "end" },
    gap: 2,
    mt: { xs: 1, sm: 2 },
    mb: 0.5,
  },
  commonButton: {
    p: 0,
    fontSize: "13px",
    my: 1,
    mb: "-8px",
  },
};

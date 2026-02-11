export const styles = {
  mainAccordionStyling: (theme) => ({
    boxShadow: theme.shadows[3],
    marginTop: "20px",
    borderRadius: "5px",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }),
  accordionSummaryStyling: {
    display: "flex",
    //flexDirection: "row-reverse",
    marginTop: "20px",
    borderRadius: "5px",
    backgroundColor: "background.default",
    "& .MuiAccordionSummary-content": {
      display: "block",
      py: 0.5,
    },
  },
  accordionTitleStyling: {
    fontWeight: 600,
    color: "text.primary",
  },
  accordionDescriptionStyling: {
    padding: "0px 0px",
  },
};

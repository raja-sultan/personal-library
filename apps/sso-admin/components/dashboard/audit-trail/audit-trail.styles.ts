import { timelineItemClasses } from "@mui/lab/TimelineItem";

export const styles = {
  cardStyling: (theme) => ({
    borderRadius: "10px",
    boxShadow: theme.shadows[16],
    // p: { xs: 0, sm: "0px 10px 0 10px" },
  }),
  cardHeaderWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  timeLineStyling: {
    [`& .${timelineItemClasses.root}:before`]: {
      flex: 0,
      padding: 0,
    },
    pl: 0,
    overflowY: "auto",
    height: "35vh",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "gray",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "red",
      borderRadius: 2,
    },
  },
  timeLineDotStyling: ({ index }) => ({
    m: 0,
    backgroundColor: index === 0 ? "primary.main" : "",
    borderColor: index === 0 ? "" : "primary.main",
  }),
  dividerStyling: () => ({
    mt: 0.5,
    mb: 0.2,
    border: "1px solid",
    "&.MuiDivider-root": {
      borderColor: "divider",
    },
  }),
  timelineContentWrapper: ({ index }) => ({
    p: index === -1 ? "0 10px" : 0,
    mt: "-8px",
    pl: 2.5,
  }),
  descriptionStyling: {
    pt: 0,
    pb: 0.5,
    color: "text.secondary",
  },
  timeStyling: {
    textAlign: "end",
    color: "primary.main",
  },
};

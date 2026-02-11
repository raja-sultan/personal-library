export const styles = {
  mainWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    mb: 3,
  },
  applicationTitle: {
    mt: { xs: 4, sm: 6 },
    fontWeight: 500,
    color: "text.secondary",
  },
  cardsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commonTypo: {
    color: "text.primary",
    fontWeight: 500,
    textTransform: "capitalize",
    mr: 1,
  },
  stageCardContainer: (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? "lightblue" : "background.default",
    minHeight: "35vh",
    height: "35vh",
    // border: 1,
    borderRadius: 2,
  }),
  stageCard: {
    // backgroundColor: isDraggingOver ? "lightblue" : "background.default",
    p: { xs: 2, sm: 3 },
    backgroundColor: "transparent",
    minHeight: "35vh",
    height: "35vh",
    overflow: "auto",
    boxShadow: 2,
    // border: 1,
    borderRadius: 2,
  },
};

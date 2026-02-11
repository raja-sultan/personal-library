export const style = {
  headerStyle: () => ({
    py: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
  }),
  descriptionStyle: () => ({
    mt: 2,
    color: "text.secondary",
  }),
  modelHeaderStyle: () => ({
    pt: 2,
    pb: 0,
    ml: 1,
    color: "success",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
  }),
  modelButtons: () => ({
    height: 35,
    width: "100%",
    minWidth: "70px",
    borderRadius: "8px",
  }),
};

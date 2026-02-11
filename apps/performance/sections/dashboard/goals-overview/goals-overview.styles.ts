export const styles = {
  mainBoxWrapper: {
    padding: "18px",
    height: { lg: "386px", xs: "100%",},
  },
  textStyle: {
    textAlign: "start",
    fontSize:"2.4rem",
    fontWeight:600,
    marginTop:"-4px"
  },
  chartBoxWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "317px",
    maxHeight: "317px",
    height: "317px",
    "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center": {
      margin: "0px",
      padding: "0px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "&.apexcharts-canvas .apexcharts5660nb5u .apexcharts-theme-light": {
        minHeight: "317.7px",
        maxHeight: "317px",
        height: "317px",
      },
      "@media (max-width: 500px)": {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
    },
  },
};

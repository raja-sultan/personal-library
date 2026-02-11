export function carerGrowth(): any {
  return {
    carerGrowthWrapper: {
      p: "18px",
      height: "100%",
      maxHeight: "185px",
      "@media(max-width: 1440px)": {
        minHeight: "186.6px",
      },
    },
    main: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    title: {
      marginLeft: "12px",
      fontSize:"1.8rem",
      fontWeight:700,
    },
    percentage: {
      lineHeight: "38px",
      padding: "7px 0px",
    },
    description:{
    fontSize:"1.2rem",
    fontWeight:400,
},
    contentBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "5px",
    },
    chipIconStyle: {
      marginLeft: "7px",
    },
    iconStyleWrap: (theme) => ({
      background: theme.palette.primary.lightest,
      width: "62px",
      height: "62px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: "0.8",
    }),
  };
}

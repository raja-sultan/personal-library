export function settingsStyles(): any {
  return {
    accordionMainBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: 2,
      paddingTop: 1.3,
      paddingBottom: 1.3,
    },
    accordionDetails: {
      paddingLeft: 6.5,
      paddingRight: 3,
    },

    childBox: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    firstChildBox: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      gap: 2,
    },
    secondChildBox: {},
    myMuiIcon: {
      transform: "rotate(180deg)",
    },
    expandIcon: {
      transform: "none !important",
    },
    textField: {
      overFlow: "hidden",
    },
    textFieldBtnWrapper: {
      position: "absolute",
      right: 0,
      backgroundColor: "primary.main",
      borderTopRightRadius: 1,
      borderBottomRightRadius: 1,
      px: 1.5,
      py: 0.8,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      gap: 1.8,
      height: "100%",
      borderRadius: 1,
      borderTopLeftRadius: "unset",
      borderBottomLeftRadius: "unset",
    },
    arrowUpBtn: {
      cursor: "pointer",
      fontSize: "unset",
    },
    arrowDownBtn: {
      cursor: "pointer",
      transform: "rotate(180deg)",
      fontSize: "unset",
    },
    dayWrapper: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#F4F3FF",
    },
  };
}

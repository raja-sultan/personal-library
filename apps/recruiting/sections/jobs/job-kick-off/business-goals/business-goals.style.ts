export const styles = {
  mainBusinessGoal: (theme: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    p: 2,
    width: "100%",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.neutral[400]}`,
    backgroundColor: theme.palette.background.paper,
    mt: 2,
  }),
  textFieldStyle: () => ({
    "&.MuiBox-root": {
      position: "absolute",
      width: "100%",
    },
    "&.MuiOutlinedInput-input": {
      paddingLeft: "10rem",
    },
  }),
  iconsBox: () => ({
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "1rem",
    top: 0,
  }),
};

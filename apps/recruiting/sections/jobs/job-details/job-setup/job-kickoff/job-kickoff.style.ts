export const styles = {
  p: 2,
  overflow: "auto",
  // backgroundColor: "primary.contrastText",

  jobKickOffHeaders: () => ({
    display: "flex",
    justifyContent: "space-between",
  }),
  jobStatus: () => ({
    color: "success.dark",
    display: "inline-block",
  }),
  mainActivity: (theme: any) => ({
    mt: 2,
    p: 2,
    borderRadius: "1rem",
    border: `1px solid ${theme.palette.grey[300]}`,
  }),
  jobKickoffActivity: (theme: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "6px",
    padding: 2,
    mt: 2,
    border: `1px solid ${theme.palette.grey[300]}`,
  }),
  mainSection: (theme: any) => ({
    mt: 2,
    p: 2,
    borderRadius: "1rem",
    border: `1px solid ${theme.palette.grey[300]}`,
  }),
};

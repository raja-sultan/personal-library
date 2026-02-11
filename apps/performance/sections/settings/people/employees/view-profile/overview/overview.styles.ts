import type { Theme } from "@mui/material";

export const styles = {
  cardWrapper: (item: string, theme: Theme) => ({
    borderRadius: "10px",
    // border: `1px solid ${theme.palette.mode === 'dark' ? alpha(theme.palette.netural[800]) : alpha(theme.palette.netural[100])}`,
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]}`,
    minHeight: item === "Feedback" ? "345px" : "initial",
    padding: "0 0 20px 0",
  }),
  gridWrapper: { display: 'flex', flexDirection: 'column', gap: '25px' },
  profileData: { 
    display: 'flex', 
    justifyContent: 'space-between',  
    flex: '100%', 
    gap: '20px', 
    px: '18px', 
    flexWrap: { lg: 'nowrap', md: 'wrap', sm: 'wrap', },
    flexDirection: { sm: 'row', xs: 'column' } 
  },
  iconWrapper: {
    background: "#F4F3FF",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
  },
  reviews: (theme: Theme) => ({
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]}`,
    p: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: "space-between",
  }),
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: "space-between",
    p: "18px 15px",
  },
  status: (item?: string) => ({
    color: item === "on track" || item === "active" || item === "completed" ? "#05603A" : "#101828",
    backgroundColor: item === "on track" || item === "active" || item === "completed" ? "#D1FADF" : "#F2F4F7",
    borderRadius: "6px",
    textTransform: "capitalize",
    padding: "2px 12px",
    fontWeight: '600 !important'
  }),
  reviewBtn: (theme: Theme) => ({
    border: `1px solid ${theme.palette.neutral[300]}`,
    borderRadius: "8px",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    p: "10px",
    flex: 1,
    cursor: 'pointer',
    fontWeight: '600 !important'
  }),
  goalsBtn: {
    padding: "11px 20px",
  },
  growth: (theme: Theme) => ({
    borderRadius: "10px",
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]}`,
    display: "flex",
    flex: "33.33%",
    p: "16px",
    flexDirection: "column",
    "& a": {
      color: theme.palette.primary.main,
      fontSize: "14px",
      fontWeight: "400",
      textDecoration: "none",
      paddingTop: "10px",
    },
  }),
  growthHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  feedback: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    '& a': {
      color: theme.palette.primary.main,
      fontSize: "16px",
      fontWeight: "600",
      textDecoration: "none",
      paddingTop: "10px",
    }
  }),
  alertWrapper: {
    backgroundColor: '#E1EFFE',
    display: "flex",
    gap: '7px',
    p: '14px 12px',
    mt: 2,
    borderRadius: '6px',
    mb: 4
  },
  alertHeading: (theme: Theme) => ({
    color: theme.palette.neutral[700],
    fontSize: 14
  })
};

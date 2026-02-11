import type { Theme } from "@mui/system";

export const styles: any = {
  cardStyle: (theme: Theme) => ({
    borderRadius: "1rem",
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.neutral[700]}`
        : `1px solid ${theme.palette.neutral[100]}`,
  }),
  flex: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  buttonsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    alignItems: "center",
  },
  buttonStyles: (theme: Theme) => ({
    color: theme.palette.mode === "dark" ? theme.palette.neutral[600] : theme.palette.neutral[700],
    fontWeight: 600,
    fontSize: "1.4rem",
    padding: "1rem 2rem",
    borderRadius: "8px",
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.neutral[700]}`
        : `1px solid ${theme.palette.neutral[300]}`,
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    "&:hover": {
      border:
        theme.palette.mode === "dark"
          ? `1px solid ${theme.palette.neutral[700]}`
          : `1px solid ${theme.palette.neutral[300]}`,
    },
    "@media (max-width: 472px)": {
      width: "100%", // Set full width on screens with a max-width of 600px
    },
  }),
  avatarStyle: (theme: Theme) => ({
    background:
      theme.palette.mode === "dark" ? theme.palette.neutral[800] : theme.palette.neutral[100],
    width: "125px",
    height: "125px",
    color: theme.palette.mode === "dark" ? theme.palette.neutral[100] : theme.palette.neutral[700],
    fontSize: "4.8rem",
    fontWeight: 600,
  }),
  uploadImg: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "1rem 1rem 0 0",
  },
  uploadBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  avatarWrapper: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "end",
    flexWrap: "wrap",
  },
  uploadBtnIcon: {
    position: "absolute",
    bottom: -10,
    right: -2.5,
  },
};

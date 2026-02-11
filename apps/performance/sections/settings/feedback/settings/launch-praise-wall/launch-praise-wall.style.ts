import { PraiseWall } from "@assets/images";

export const styles = {
  launchPraiseWall: {
    objectFit: "cover",
    backgroundImage: `url(${PraiseWall.src})`,
    height: "84.5vh",
    backgroundSize: "cover",
    alignItems: "center",
  },
  card: {
    height: "65vh",
    width: { xs: "auto", sm: "42rem" },
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
  },
  cardWrapper: {
    padding: "20px 16px",
    width: { xs: "auto", sm: "42rem" },
  },
  avatarGroup: {
    writingMode: "vertical-rl",
    "--AvatarGroup-gap": "-8px",
  },
  avatar: { position: "relative", mt: -1, zIndex: 10 },
  privacyTextWrapper: {
    borderRadius: "6px",
    backgroundColor: "neutral.100",
    px: 1.2,
    py: 0.2,
  },
  reactionContainer: {
    mt: 2.4,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "neutral.100",
    pt: 1.6,
  },
  reactionEmojiWrapper: (viewOnly: boolean) => ({
    borderRadius: "6px",
    backgroundColor: "neutral.100",
    px: 0.4, 
    py: 0.3,
    cursor: viewOnly ? "default" : "pointer",
    // opacity: viewOnly ? "0.5" : "1",
  }),
  reactionEmoji: {
    cursor: "pointer",
  },
  typography: {
    color: (theme) =>
      theme.palette.mode === "dark" ? "neutral.50" : "neutral.800",
  },
  cardFooterWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFooterContent: {
    color: (theme) =>
      theme.palette.mode === "dark" ? "neutral.400" : "neutral.500",
  },
};

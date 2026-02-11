import { CircleIcon } from "@assets/icons";
import type { Theme} from "@mui/material";
import { Box, Button, Typography } from "@mui/material";

export function CompensatedFooter({ btnText, btnProps, title, message }): JSX.Element {
  return (
    <Box sx={styles.footerWrapper}>
      <Box sx={styles.contentWrapper}>
        <Typography
          variant="subtitle1"
          fontWeight={400}
          color="text.secondary"
        >
          {title}
        </Typography>
        <CircleIcon sx={styles.icon} />
        <Typography
          variant="subtitle1"
          fontWeight={400}
          color="text.secondary"
        >
          {message}
        </Typography>
      </Box>
      <Box>
        <Button variant='contained' {...btnProps}>
          {btnText}
        </Button>
      </Box>
    </Box>
  )
}

const styles = {
  footerWrapper: (theme: Theme) => ({
    zIndex: 9999,
    flexWrap: "wrap",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: { xss: "center", sm: "space-between" },
    alignItems: "center",
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    paddingY: { xxs: 1, md: 3.4 },
    paddingX: { xxs: 1, lg: 10 },
  }),
  icon: {
    width: "8px",
    height: "8px",
    fill:'#667085'
  },
  contentWrapper: {
    flexDirection: { xxs: "column", md: "row" },
    display: "flex",
    justifyContent: "center",
    gap: '10px',
    alignItems: { xxs: "align-items: baseline", md: "center" },
  },
}
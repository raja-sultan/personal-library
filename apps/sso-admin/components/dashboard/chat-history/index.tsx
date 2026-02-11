import List from "@mui/material/List";
import Card from "@mui/material/Card";
import { Badge, Box, Typography } from "@mui/material";
import Link from "next/link";
import { chatItems } from "./types";
import Image from "next/image";
import { styles } from "./styles";
import { useTheme } from "@mui/material/styles";

export function ChatHistory(): JSX.Element {
  const theme = useTheme();

  return (
    <Card sx={styles.mainCardStyling(theme)}>
      <Box sx={styles.mainCardFlexStyling}>
        <Typography variant="h6">Chat History</Typography>
        <Link href="/chat-history" passHref style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            View All
          </Typography>
        </Link>
      </Box>
      <Box sx={styles.scrollStyling}>
        {chatItems.map((item) => (
          <List key={item.id} sx={{ bgcolor: "background.paper" }}>
            <Link href={item.link} style={{ textDecoration: "none" }}>
              <Box sx={styles.innerCardStyling(theme)}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Image
                    src={item.image}
                    style={{ width: 52, height: 52 }}
                    alt="profile"
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: "text.primary" }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.subTitle}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ padding: "10px" }}>
                  <Badge
                    badgeContent={item.badgeContents}
                    color="primary"
                    sx={{ float: "right" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ mt: "10px", color: theme.palette.neutral[500] }}
                  >
                    {item.date}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </List>
        ))}
      </Box>
    </Card>
  );
}

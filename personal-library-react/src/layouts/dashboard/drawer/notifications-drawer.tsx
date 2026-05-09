import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProfileIcon } from "@root/assets/icons/profile-icon";
import Link from "next/link";

interface NotificationDrawerProps {
  openNotifications: boolean;
  toggleDrawerNotifications: () => void;
}

const notificationsList = [
  {
    id: 1,
    message: "Job post successfully",
    time: "3 hours ago",
    icon: <ProfileIcon width="32px" height="32px" />,
  },
  {
    id: 1,
    message: "Candidate applied for the new position.",
    time: "5 days ago",
    icon: <ProfileIcon width="32px" height="32px" />,
  },
];

export function NotificationDrawer({
  openNotifications,
  toggleDrawerNotifications,
}: NotificationDrawerProps): JSX.Element {
  return (
    <Drawer
      anchor="right"
      open={openNotifications}
      onClose={toggleDrawerNotifications}
      sx={{ borderRadius: "10px" }}
    >
      <Box
        sx={{
          width: { xs: "280px", lg: "340px" },
          p: 2,
          borderRadius: 5,
        }}
      >
        <IconButton
          sx={{ display: "block", ml: "auto" }}
          onClick={toggleDrawerNotifications}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          Notifications
        </Typography>
        {notificationsList.map((item) => (
          <Box
            key={item.id}
            sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
          >
            <Box sx={{ my: 3, display: "flex", alignItems: "flex-start" }}>
              {item.icon}
              <Box sx={{ ml: 1.5 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    minHeight: "40px",
                  }}
                >
                  {item.message}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "12px",
                    fontWeight: "500",
                    mt: 1,
                  }}
                >
                  {item.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box sx={{ position: "absolute", bottom: "20px", right: "15px" }}>
          <StyledViewAllLink href="/notifications">View All</StyledViewAllLink>
        </Box>
      </Box>
    </Drawer>
  );
}

//--------------------------------------------------------
// Styled  components
const StyledViewAllLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[5],
  fontSize: "12px",
  fontWeight: "600",
  padding: "8px 12px",
  borderRadius: 3,
  textDecoration: "none",
}));

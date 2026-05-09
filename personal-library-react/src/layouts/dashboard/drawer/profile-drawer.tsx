import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Divider, Drawer, IconButton } from "@mui/material";
import { SettingsIcon } from "@root/assets/icons/settings-icon";
import { MyProfileIcon } from "@root/assets/icons/my-profile-icon";
import { LogoutIcon } from "@root/assets/icons/logout-icon";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "@store";
import { authActions } from "@slices";
import { useRouter } from "next/navigation";
import { awsBaseUrl } from "@root/config";

const profileLinksList = [
  {
    id: 1,
    title: "My Profile",
    subTitle: "View profile information",
    link: "/my-profile",
    icon: <MyProfileIcon />,
  },
  {
    id: 2,
    title: "Settings",
    subTitle: "View your settings",
    link: "/settings/settings-overview",
    icon: <SettingsIcon sx={{ color: "primary.main" }} />,
  },
  // {
  //   id: 3,
  //   title: "Change Password",
  //   subTitle: "Manage your password",
  //   link: "/change-password",
  //   icon: <KeyIcon sx={{ color: "primary.main" }} />,
  // },
  {
    id: 4,
    title: "Logout",
    subTitle: "Logout from the platform",
    link: "/sign-in",
    icon: <LogoutIcon sx={{ color: "primary.main" }} />,
  },
];

interface ProfileLinkProps {
  id?: number;
  title?: string;
  subTitle?: string;
  icon?: React.ReactNode;
  link?: string;
}

export function ProfileDrawer({ open, toggleDrawer, data }: any): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  function handleProfileListClick(item: ProfileLinkProps): any {
    const { title, link }: any = item;
    if (title === "Logout") {
      dispatch(authActions.logout());
      router.push(link);
    } else {
      router.push(link);
      toggleDrawer();
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: { xs: "280px", lg: "340px" },
          p: 2,
          borderRadius: 5,
        }}
      >
        <IconButton
          sx={{ display: "block", ml: "auto" }}
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          My Account
        </Typography>
        <Box sx={{ py: 2, display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: "7rem", height: "7rem" }}
            alt="User Avatar"
            src={`${awsBaseUrl}${data?.data?.profileImage}`}
          />
          <Box sx={{ pl: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
              {data?.data?.firstName} {data?.data?.lastName}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {data?.data?.employeeTitle}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ height: "1.5px", backgroundColor: "divider" }} />
        {profileLinksList.map((item) => (
          <Box
            key={item.id}
            onClick={() => {
              handleProfileListClick(item);
            }}
            style={{ cursor: "pointer" }}
          >
            <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "primary.light",
                  borderRadius: 5,
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ pl: 1.5 }}>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {item.subTitle}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, useTheme, Container, Avatar } from "@mui/material";
import { BellIcon } from "@root/assets/icons/bell-icon";
import { NotificationDrawer, ProfileDrawer } from "./drawer";
import { DesktopNavbar, MobileNavbar } from "./navbar";
import { awsBaseUrl } from "@root/config";
import { useGetMyProfileDataApiQuery } from "@services/my-profile/my-profile-api";

function Header(): JSX.Element {
  const [anchorElAdd, setAnchorElAdd] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { data } = useGetMyProfileDataApiQuery({});

  const theme = useTheme();

  const handleOpenAdd = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElAdd(event.currentTarget);
  };

  const handleCloseAdd = (): void => {
    setAnchorElAdd(null);
  };

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const toggleDrawerNotifications = (): void => {
    setOpenNotifications(!openNotifications);
  };

  const toggleDrawerMenu = (): void => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
        boxShadow: theme.shadows[5],
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopNavbar
            handleOpenAdd={handleOpenAdd}
            handleCloseAdd={handleCloseAdd}
            anchorElAdd={anchorElAdd}
          />
          <MobileNavbar
            toggleDrawerMenu={toggleDrawerMenu}
            handleOpenAdd={handleOpenAdd}
            handleCloseAdd={handleCloseAdd}
            anchorElAdd={anchorElAdd}
            openMenu={openMenu}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Notification">
              <IconButton
                sx={{ mr: { xs: 1, lg: 3 } }}
                onClick={toggleDrawerNotifications}
              >
                <BellIcon />
              </IconButton>
            </Tooltip>
            <NotificationDrawer
              openNotifications={openNotifications}
              toggleDrawerNotifications={toggleDrawerNotifications}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile settings">
              <IconButton onClick={toggleDrawer} sx={{ pt: 1 }}>
                <Avatar
                  sx={{ width: "6rem", height: "6rem" }}
                  alt="Profile Icon"
                  src={`${awsBaseUrl}${data?.data?.profileImage}`}
                />
              </IconButton>
            </Tooltip>

            <ProfileDrawer open={open} toggleDrawer={toggleDrawer} data={data}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

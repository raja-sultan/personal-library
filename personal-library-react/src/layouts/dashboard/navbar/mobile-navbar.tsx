import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { Drawer, Button, IconButton, MenuItem, Menu } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// google fonts
import { Poppins } from "next/font/google";
import { LogoSsoAdmin } from "common";
import { onboardingData } from "./navbar.data";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const pagesNavbar = [
  { id: 1, title: "Dashboard", link: "/dashboard" },
  { id: 2, title: "New Hiring", link: "/new-hiring" },
  { id: 3, title: "Tasks", link: "/tasks" },
  { id: 4, title: "Reports", link: "/reports" },
];

interface MobileNavbarProps {
  handleOpenAdd: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseAdd: () => void;
  toggleDrawerMenu: () => void;
  anchorElAdd: null | HTMLElement;
  openMenu: boolean;
}

export function MobileNavbar({
  toggleDrawerMenu,
  openMenu,
}: MobileNavbarProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Menu">
            <Button onClick={toggleDrawerMenu}>
              <MenuIcon />
            </Button>
          </Tooltip>
          <Drawer
            anchor="left"
            open={openMenu}
            onClose={toggleDrawerMenu}
            sx={{ borderRadius: "10px" }}
          >
            <Box sx={{ width: "240px", p: 2, borderRadius: 5 }}>
              <IconButton
                sx={{ display: "block", ml: "auto" }}
                onClick={toggleDrawerMenu}
              >
                <CloseIcon />
              </IconButton>
              {pagesNavbar.map((item) => (
                <StyledMenuLink key={item.id} href={item.link}>
                  <Typography>{item.title}</Typography>
                </StyledMenuLink>
              ))}
            </Box>
          </Drawer>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", lg: "none" },
          position: "relative",
        }}
      >
        <Link href="/">
          <LogoSsoAdmin height="2rem" />
        </Link>
        <Box sx={{ position: "absolute", left: "28px", bottom: "-14px" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "primary.main",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "bottom",
            }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            On Boarding
            {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </Typography>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              a: {
                textDecoration: "none",
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ px: 1.5 }}>
              Switch To
            </Typography>
            {onboardingData.map((item: any) => {
              return (
                <MenuItem key={item?.id}>
                  <Link href={item?.link}>
                    <Typography
                      color="initial"
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "150px",
                        position: "relative",
                      }}
                    >
                      {item?.title}
                      {item?.comingSoon && (
                        <span
                          style={{
                            fontSize: "10px",
                            position: "absolute",
                            left: "0px",
                            bottom: "-4px",
                          }}
                        >
                          coming soon
                        </span>
                      )}
                      {item?.image}
                    </Typography>
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Box>
    </>
  );
}

//--------------------------------------------------------
// Styled  components

const StyledMenuLink = styled(Link)(({ theme }) => ({
  padding: "15px",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  fontFamily: poppins.style.fontFamily,
}));

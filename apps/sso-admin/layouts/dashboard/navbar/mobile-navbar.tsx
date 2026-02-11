import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { Drawer, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

// google fonts
import { Poppins } from "next/font/google";
import { LogoSsoAdmin } from "common";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const pagesNavbar = [
  { id: 1, title: "Dashboard", link: "/dashboard" },
  { id: 2, title: "Company Management", link: "/company-management" },
  { id: 3, title: "User Management", link: "/user-management" },
  { id: 5, title: "Audit Log", link: "/audit-log" },
  { id: 6, title: "Backup", link: "/back-up" },
  { id: 7, title: "Calendar", link: "/calendar" },
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

      <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
        <Link href="/">
          <LogoSsoAdmin height="2rem" />
        </Link>
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

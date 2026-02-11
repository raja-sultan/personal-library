import { ArrowDownIcon } from "@assets/icons";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";

// google fonts
import { LogoRecruiting } from "common";
import { Poppins } from "next/font/google";
import { recruitingData } from "./navbar.data";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const pagesNavbar = [
  { id: 1, title: "Dashboard", link: "/dashboard" },
  { id: 2, title: "Jobs", link: "/jobs" },
  { id: 3, title: "Candidates", link: "/candidates" },
  { id: 4, title: "CRM", link: "/crm" },
  { id: 5, title: "Reports", link: "/reports/overview" },
  { id: 6, title: "Configuration", link: "/configuration" },
];

const addList = [
  { id: 1, title: "Add a Candidate", link: "/add-candidate" },
  { id: 2, title: "Add a Referral", link: "/view-jobs" },
  { id: 3, title: "Create a Job", link: "/job-types" },
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
  handleOpenAdd,
  handleCloseAdd,
  anchorElAdd,
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
              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  variant="outlined"
                  onClick={handleOpenAdd}
                >
                  Add
                  <ArrowDownIcon width="12px" height="12px" />
                </Button>
                <Menu
                  sx={{ mt: "45px" }}
                  id="add-appbar"
                  anchorEl={anchorElAdd}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElAdd)}
                  onClose={handleCloseAdd}
                >
                  {addList.map((item) => (
                    <MenuItem key={item.id} onClick={handleCloseAdd}>
                      <StyledDropdownLink href={item.link}>
                        <Typography variant="subtitle2">{item.title}</Typography>
                      </StyledDropdownLink>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
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
          <LogoRecruiting height="2rem" />
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
            Recruiting
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
            {recruitingData.map((item: any) => {
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

const StyledDropdownLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  fontFamily: poppins.style.fontFamily,
}));

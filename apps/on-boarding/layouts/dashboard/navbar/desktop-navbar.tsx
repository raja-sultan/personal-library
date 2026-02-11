import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";

// google fonts
import { Menu, MenuItem, Typography } from "@mui/material";
import { LogoSsoAdmin } from "common";
import { Poppins } from "next/font/google";
import { onboardingData } from "./navbar.data";
import { usePathname } from "next/navigation";

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

interface DesktopNavbarProps {
  handleOpenAdd: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseAdd: () => void;
  anchorElAdd: null | HTMLElement;
}

export function DesktopNavbar({
  // handleOpenAdd,
  handleCloseAdd, // anchorElAdd,
}: DesktopNavbarProps): JSX.Element {
  const pathName = usePathname();
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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", lg: "flex" },
          position: "relative",
        }}
      >
        <Link href="/">
          <LogoSsoAdmin />
        </Link>
        <Box sx={{ position: "absolute", left: "110px", bottom: "-4px" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "primary.main",
              fontSize: "1.5rem",
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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          gap: 1,
        }}
      >
        {pagesNavbar.map((page) => (
          <StyledNavLink
            key={page.id}
            href={page.link}
            onClick={handleCloseAdd}
            sx={{
              "&::before": {
                opacity: pathName.includes(page.link) ? 1 : 0,
              },
            }}
          >
            {page.title}
          </StyledNavLink>
        ))}
      </Box>
    </>
  );
}

//--------------------------------------------------------
// Styled  components

const StyledNavLink = styled(Link)(({ theme }) => ({
  position: "relative",
  padding: "25px 15px",
  color: theme.palette.text.secondary,
  display: "block",
  borderBottom: "3px solid transparent",
  textDecoration: "none",
  textAlign: "center",
  fontFamily: poppins.style.fontFamily,

  "&::before": {
    content: `""`,
    opacity: 0,
    position: "absolute",
    width: "100%",
    height: "5px",
    bottom: "-3px",
    left: 0,
    borderTopLeftRadius: "5rem",
    borderTopRightRadius: "5rem",
    backgroundColor: theme.palette.primary.main,
    transition: "opacity .150s",
  },
  "&:hover": {
    "&::before": {
      opacity: 1,
    },
  },
}));

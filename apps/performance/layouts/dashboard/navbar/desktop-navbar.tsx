import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";

// google fonts
import { LogoPerformance } from "common";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
// import { useSelector } from "react-redux";
import { pagesNavbar, routePermissions } from "@layouts/dashboard/navbar/navbar.data";
import { performanceData } from "./nav-bar.data";
// import { pagesNavbar, routePermissions } from "./navbar.data";
import { PermissionProtected } from "@guards/permission-protected";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export function DesktopNavbar(): JSX.Element {
  const pathName = usePathname();
  // const {
  //   user: { company },
  // } = useSelector((state: any) => state.auth);
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
      <Box sx={{ display: { xs: "none", xl: "flex" }, position: "relative" }}>
        <Link href="/">
          <LogoPerformance />
        </Link>
        <Box sx={{ position: "absolute", left: "100px", bottom: "-4px" }}>
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
            Performance
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
            {performanceData.map((item: any) => {
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
          display: { xs: "none", xl: "flex" },
          alignItems: "center",
          gap: { xl: "10px" },
        }}
      >
        {pagesNavbar
          // .filter(
          //   (item) =>
          //     company.menuPermissions?.includes(
          //       routePermissions[item.link]?.id
          //     )
          //   // !routePermissions[item.link] ||
          //   // Boolean(
          //   //   Object.keys(userPermissions).find((permission) =>
          //   //     permission.startsWith(routePermissions[item.link])
          //   //   )
          //   // )
          // )
          .map((page) => (
            // <PermissionProtected permission={routePermissions[page.link]}>
              <StyledNavLink
                key={page.id}
                href={page.link}
                className={pathName.includes(page.link) ? "active" : ""}
              >
                <Typography
                  variant="body2"
                  fontWeight={pathName.includes(page.link) ? "600" : "500"}
                  color={pathName.includes(page.link) ? "primary" : "neutral.400"}
                >
                  {page.title}
                </Typography>
              </StyledNavLink>
            // </PermissionProtected>
          ))}
      </Box>
    </>
  );
}

//--------------------------------------------------------
// Styled  components

const StyledNavLink = styled(Link)(({ theme }) => ({
  position: "relative",
  padding: "0px 8px",
  color: theme.palette.neutral[600],
  display: "block",
  borderBottom: "3px solid transparent",
  textDecoration: "none",
  textAlign: "center",
  fontFamily: poppins.style.fontFamily,
  "&.active::before": {
    opacity: 1,
  },
  "&::before": {
    content: `""`,
    opacity: 0,
    position: "absolute",
    width: "100%",
    height: "5px",
    bottom: "-29px",
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

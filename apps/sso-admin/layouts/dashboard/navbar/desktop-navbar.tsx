import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";

// google fonts
import { Typography } from "@mui/material";
import { LogoSsoAdmin } from "common";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

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
        <Box sx={{ position: "absolute", left: "120px", bottom: "-4px" }}>
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
            SSO Admin
          </Typography>
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

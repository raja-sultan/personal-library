import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { Button } from "@mui/material";
import { ArrowDownIcon } from "@assets/icons";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
// google fonts
import { Poppins } from "next/font/google";
import { LogoRecruiting } from "common";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  { id: 2, title: "Add a Referral", link: "/dashboard/add-a-referral" },
  { id: 3, title: "Create a Job", link: "/job-types" },
];

interface DesktopNavbarProps {
  handleOpenAdd: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseAdd: () => void;
  anchorElAdd: null | HTMLElement;
}

export function DesktopNavbar({
  handleOpenAdd,
  handleCloseAdd,
  anchorElAdd,
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
          <LogoRecruiting />
        </Link>
        <Box sx={{ position: "absolute", left: "98px", bottom: "-5px" }}>
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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          gap: 3,
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
        <Box sx={{ flexGrow: 0 }}>
          <Button
            variant="outlined"
            sx={{ display: "flex", gap: 2 }}
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
    </>
  );
}

//--------------------------------------------------------
// Styled  components

const StyledNavLink = styled(Link)(({ theme }) => ({
  position: "relative",
  padding: "2.3rem 1rem",
  color: theme.palette.text.secondary,
  display: "block",
  borderBottom: "3px solid transparent",
  textDecoration: "none",
  textAlign: "center",
  fontFamily: poppins.style.fontFamily,
  fontSize: "1.9rem",

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

  "@media (max-width: 1400px)": {
    fontSize: "1.6rem",
    padding: "2.3rem 0.5rem",
  },
}));

const StyledDropdownLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  fontFamily: poppins.style.fontFamily,
}));

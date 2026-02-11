"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import type { BreadcrumbObjectTypes } from "./custom-bread-crumbs.types";
import { styled } from "@mui/material/styles";

export function CustomBreadCrumbs({ breadcrumbs }): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <HomeIcon sx={{ width: "20px", height: "20px", mr: 1 }} />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="medium" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs?.map((item: BreadcrumbObjectTypes) => (
          <NavLink key={item?.key} color="inherit" href={`${item.link}`}>
            {item.value}
          </NavLink>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
}));

"use client";

import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { SettingsContext } from "common";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { JobDetailsNavList } from "./data";
import toast from "react-hot-toast";

export default function LayoutJobDetails({ children }): JSX.Element {
  const pathName = usePathname();
  const [open, setOpen] = useState<number | null | undefined>(null);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const router = useRouter();
  const theme = useTheme();
  const themeContext = useContext(SettingsContext);
  const { paletteMode } = themeContext;
  if (!jobId) {
    toast.error(`jobId not found!`);
    router.push("/jobs");
  }
  const bgcolorTheme = paletteMode === "light" ? "#F4F3FF" : "";
  const openHander = (id: any) => {
    if (open !== null) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };
  function filterNavListByLink(link): any {
    const foundItem = JobDetailsNavList.find((item) => {
      if (item.link === link) {
        return true;
      } else if (item.subNav) {
        const subItem = item.subNav.find((sub) => sub.link === link);
        return subItem !== undefined;
      }
      return false;
    });

    return foundItem || null;
  }
  useEffect(() => {
    const filteredItem = filterNavListByLink(pathName);
    setOpen(filteredItem?.id);
  }, [pathName]);
  return (
    <Grid container>
      <Grid
        item
        md={2.5}
        xs={12}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 2,
          px: 0.5,
        }}
      >
        <Box
          sx={{
            px: 0.5,
            height: { xs: "auto", lg: "75vh" },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
          }}
        >
          <Typography
            fontWeight={600}
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}
          >
            <ContentPasteSearchRoundedIcon />
            Jobs
          </Typography>
          {JobDetailsNavList.map((JobDetailsNavItem: any) => {
            return (
              <Box
                key={JobDetailsNavItem?.id}
                borderLeft={`${
                  pathName === JobDetailsNavItem?.link && "5px solid"
                }`}
                borderRadius={`${
                  pathName === JobDetailsNavItem?.link && "0.5em"
                }`}
                borderColor="primary.main"
                sx={{
                  px: JobDetailsNavItem?.link ? 2 : 0,
                  py: 1,

                  transition: " all 0.35s",
                  backgroundColor:
                    pathName !== JobDetailsNavItem?.link ? "" : bgcolorTheme,
                  "&:hover": {
                    boxShadow: JobDetailsNavItem?.link ? 4 : 0,
                    borderRadius: 1,
                  },
                  a: {
                    textDecoration: "none",
                  },
                }}
              >
                {JobDetailsNavItem?.link ? (
                  <Link
                    href={{
                      pathname: JobDetailsNavItem?.link,
                      query: {
                        jobId,
                      },
                    }}
                  >
                    <Stack flexDirection="row" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color={
                          paletteMode === "light" ? "neutral.900" : "white"
                        }
                      >
                        <CircleOutlinedIcon
                          sx={{
                            fontSize: "10px",
                            color: "primary.main",
                            mr: 1,
                            visibility: `${
                              !pathName.includes(JobDetailsNavItem?.link) &&
                              "hidden"
                            }`,
                          }}
                        />
                        {JobDetailsNavItem?.title}
                      </Typography>
                    </Stack>
                  </Link>
                ) : (
                  <Box>
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="mainStack"
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        openHander(JobDetailsNavItem?.id);
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ pl: 2 }}
                        color={
                          paletteMode === "light" ? "neutral.900" : "white"
                        }
                      >
                        {JobDetailsNavItem?.title}
                      </Typography>
                      <IconButton>
                        {open === JobDetailsNavItem?.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Stack>
                    {JobDetailsNavItem?.subNav?.map((subNavItem: any) => {
                      return (
                        <Collapse
                          in={open === JobDetailsNavItem?.id}
                          key={subNavItem?.id}
                        >
                          <Box
                            key={subNavItem?.id}
                            borderLeft={`${
                              pathName === subNavItem?.link && "5px solid"
                            }`}
                            borderRadius={`${
                              pathName === subNavItem?.link && "0.5em"
                            }`}
                            borderColor="primary.main"
                            sx={{
                              px: 2,
                              py: 1,
                              transition: " all 0.35s",
                              backgroundColor: !pathName.includes(
                                subNavItem?.link
                              )
                                ? ""
                                : bgcolorTheme,
                              "&:hover": {
                                boxShadow: subNavItem?.link ? 4 : 0,
                                borderRadius: 1,
                              },
                              a: {
                                textDecoration: "none",
                              },
                            }}
                          >
                            <Link
                              href={{
                                pathname: subNavItem?.link,
                                query: { jobId },
                              }}
                            >
                              <Stack flexDirection="row" alignItems="center">
                                <Typography
                                  variant="subtitle1"
                                  color={
                                    paletteMode === "light"
                                      ? "neutral.900"
                                      : "white"
                                  }
                                >
                                  <CircleOutlinedIcon
                                    sx={{
                                      fontSize: "10px",
                                      color: "primary.main",
                                      mr: 1,
                                      visibility: `${
                                        !pathName.includes(subNavItem?.link) &&
                                        "hidden"
                                      }`,
                                    }}
                                  />
                                  {subNavItem?.title}
                                </Typography>
                              </Stack>
                            </Link>
                          </Box>
                        </Collapse>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Grid>
      <Grid
        item
        md={9}
        xs={12}
        boxShadow={2}
        borderRadius={2}
        pt={0}
        sx={{
          px: 2,
          height: { xs: "auto", lg: "79vh" },
          ml: { xs: 0, lg: 2 },
          mt: { xs: 2, lg: 0 },
          overflowY: "auto",
          backgroundColor: theme.palette.background.paper,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

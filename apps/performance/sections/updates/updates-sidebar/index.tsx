"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, Stack, Typography, alpha } from "@mui/material";
import type { SxProps } from "@mui/material";
import { LinkComp } from "@sections/settings/sidebar/link";
import HorizontalTabs from "@components/horizontal-tab";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetUpdatesQuery } from "@services/updates/updates-api";
import dayjs from "dayjs";
import { PERMISSIONS } from "@enums/permissions";

const iconStyle = {
  width: "28px",
  height: "28px",
};

interface PropTypes {
  sx: SxProps;
}

export function UpdatesSidebar(props: PropTypes): JSX.Element {
  const { sx } = props;
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
  };
  const pathName = window.location.href;
  const searchParams = useSearchParams().get("date");

  const { data: updatesList } = useGetUpdatesQuery({ type: activeTab === 0 ? "Private" : "Public" });
  const publicUpdate = updatesList?.data[0]?.publicUpdates;
  const currentUpdates = updatesList?.data[0]?.currentUpdates;
  const pastUpdates = updatesList?.data[0]?.pastUpdates;

  useEffect(() => {
    if (currentUpdates && currentUpdates.length > 0) {
      const firstUpdateId = currentUpdates[0]._id;
      router.push(`/updates?type=current&id=${firstUpdateId}`);
    }
  }, [currentUpdates, router]);

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES

  const { VIEW } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES_FOR_ALL_EMPLOYEES.PERMISSION

  return (
    <Card
      sx={{
        ...sx,
        "& .tab_wrapper": {
          display: "block",
          margin: "14px",
          marginBottom: "16px",
          "& .tab_root": {
            flex: 1,
          },
        },
      }}
    >
      <HorizontalTabs permissionsArray={[PERMISSION.VIEW_OWN, VIEW]} tabsArray={["Private", "Public"]} onChange={handleTabChange}>
        <Stack spacing={2}>
          {currentUpdates &&
            (
              <Stack spacing={1}>
                <Typography variant="h6" padding="0px 24px 0px 24px" textTransform="capitalize">
                  Current
                </Typography>
                {currentUpdates.length !== 0 ? currentUpdates?.map((item) => {
                  return (
                    <Stack
                      key={item.id}
                      direction="row"
                      justifyContent="space-between"
                      padding="0px 24px"
                      sx={styles.itemStyles(searchParams?.toLowerCase() === item?.status.toLowerCase())}
                    >
                      <LinkComp pathName={pathName} name={dayjs(item.from).format("MMM DD") + " - " + dayjs(item.to).format("MMM DD")} link={`?type=current&id=${item._id}`} {...item} />
                      <Avatar alt="avatar" src="" sx={iconStyle} />
                    </Stack>
                  );
                }) : <Stack

                  direction="row"
                  justifyContent="space-between"
                  padding="0px 24px"
                >
                  <Typography variant="body2" color="e2e2e2">No Item</Typography>
                </Stack>}
              </Stack>
            )
          }
          {pastUpdates &&
            (
              <Stack spacing={1}>
                <Typography variant="h6" padding="0px 24px 0px 24px" textTransform="capitalize">
                  Past
                </Typography>
                {
                  pastUpdates.length !== 0 ? pastUpdates?.map((item) => {
                    return (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                        padding="0px 24px"
                        sx={styles.itemStyles(searchParams?.toLowerCase() === item?.status.toLowerCase())}
                      >
                        <LinkComp pathName={pathName} name={dayjs(item.from).format("MMM DD") + " - " + dayjs(item.to).format("MMM DD")} link={`?type=past&id=${item._id}`} />
                        <Avatar alt="avatar" src="" sx={iconStyle} />
                      </Stack>
                    );
                  }) : <Stack

                    direction="row"
                    justifyContent="space-between"
                    padding="0px 24px"
                  >
                    <Typography variant="body2">No Item</Typography>
                  </Stack>
                }
              </Stack>
            )
          }
        </Stack>
        <Stack>
          {publicUpdate?.length !== 0 ? publicUpdate?.map((item) => {
            return (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
                padding="8px 24px"
                sx={styles.itemStyles(searchParams?.toLowerCase() === item?.status.toLowerCase())}
              >
                <LinkComp pathName={pathName} name={dayjs(item.from).format("MMM DD") + " - " + dayjs(item.to).format("MMM DD")} link={`?type=public&id=${item._id}`} />
                <Avatar alt="avatar" src="" sx={iconStyle} />
              </Stack>
            );
          }) :
            <Stack

              direction="row"
              justifyContent="space-between"
              padding="0px 24px"
            >
              <Typography variant="body2">No Item</Typography>
            </Stack>
          }
        </Stack>
      </HorizontalTabs>
    </Card>
  );
}

const styles = {
  itemStyles:
    (isCurrent: boolean) =>
      ({ palette }) => ({
        position: "relative",
        background: isCurrent ? alpha(palette.primary.light, 0.2) : "",
        "&:hover": {
          background: alpha(palette.primary.light, 0.2),
        },
        "&::before": {
          position: "absolute",
          content: "''",
          left: 0,
          top: 0,
          height: "100%",
          width: "5px",
          background: isCurrent ? palette.primary.main : "",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        },
      }),
};

"use client";
import { Card, Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { sidebarData } from "./sidebar.data";
import { usePathname } from "next/navigation";
import type { SUBDATA, SUBLINKS } from "./sidebar.interface";
import { CustomAccordion } from "./accordion";
import { LinkComp } from "./link";

interface PropTypes {
  sx: SxProps
}
export function SettingsSidebar(props: PropTypes): JSX.Element {
  const { sx } = props
  const pathName = usePathname();
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    sidebarData.map(({ subData }: { subData: SUBDATA[] }) =>
      subData.map(
        ({ id, subLinks }: { id: string; subLinks: SUBLINKS[] }) =>
          subLinks?.map(({ link }: { link: string }) => {
            if (pathName.includes(link)) {
              setExpanded(id);
            }
            return undefined;
          })
      )
    );
  }, [pathName]);

  return (
    <Card sx={{ ...sx }}>
      {sidebarData.map(({ heading, subData, id }) => (
        <Box key={id}>
          <Typography variant="h6" m="24px">
            {heading}
          </Typography>
          {subData.map((item) =>
            item.subLinks ? (
              <Fragment key={item.id}>
                <CustomAccordion
                  expanded={expanded}
                  handleChange={handleChange}
                  pathName={pathName}
                  {...item}
                />
              </Fragment>
            ) : (
              <Fragment key={item.id}>
                <LinkComp
                  padding="8px 24px"
                  pathName={pathName}
                  onClick={() => {
                    setExpanded(false);
                  }}
                  {...item}
                />
              </Fragment>
            )
          )}
        </Box>
      ))}
    </Card>
  );
}

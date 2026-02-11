"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import { SidebarStyles } from "./career-vision.styles";
import { useCareerVision } from "./use-career-vision";
import { CareerVisionContent } from "./career-vision-content";
import type { TabPanelProps } from "./career-vision.types";
import { NoContent } from "common";
import { NoDataFound } from "@components/no-data";

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number): any {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function CareerVision(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const { data } = useCareerVision();

  const tabItem = data?.data
    ?.filter((item) => item.enabled)
    .map((item) => ({
      label: item.name,
      content: <CareerVisionContent data={item} />,
    }));

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };
  const styles = SidebarStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={2} lg={3} md={3} width="100%">
          <Card>
            <Box sx={styles.common}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={styles.tabsStyle}
              >
                {tabItem?.map((item, index) => (
                  <Tab
                    disableRipple
                    key={item?._id}
                    label={item.label}
                    {...a11yProps(index)}
                    sx={styles.tabStyle}
                  />
                ))}
              </Tabs>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} xl={10} lg={9} md={9} width="100%">
          <Card>
            {tabItem?.length > 0 ? (
              <Box sx={{ ...styles.rightContentStylesWrap }}>
                {tabItem?.map((item, index) => (
                  <TabPanel key={item?._id} value={value} index={index}>
                    {item.content}
                  </TabPanel>
                ))}
              </Box>
            ) : (
              <NoDataFound
                isCustomCard
                sx={{ height: "70vh", marginTop: "2rem" }}
                icon={<NoContent />}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

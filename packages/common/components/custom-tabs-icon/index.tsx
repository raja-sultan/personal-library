"use client";

import { Children, useState } from "react";
import type { SyntheticEvent } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import type { Theme } from "@mui/material";
import type { CustomTabsIconProps } from "./custom-tabs-icon.types";
import { styles } from "./custom-tabs-icon.styles";

export function CustomTabsIcon(props: CustomTabsIconProps): JSX.Element {
  const {
    tabsNameArray = [],
    children,
    tabsProps,
    tabProps,
    maxWidth = 300,
    tabsRootSx,
    tabRootSx,
    outerValue,
    setOuterValue,
  } = props;

  const [value, setValue] = useState(0);

  const arrayChildren = Children.toArray(children);
  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    if (outerValue && setOuterValue) {
      setOuterValue(newValue);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box>
      <Tabs
        selectionFollowsFocus
        orientation="horizontal"
        variant={tabsNameArray.length > 2 ? "scrollable" : "standard"}
        sx={(theme: Theme) => styles.tabRoot(theme, maxWidth, tabsRootSx)}
        TabIndicatorProps={{ style: { display: "flex" } }}
        value={outerValue ? outerValue : value}
        onChange={handleChange}
        {...tabsProps}
      >
        {tabsNameArray.map((data: any) => (
          <Tab
            key={data.id}
            disableRipple
            iconPosition="start"
            sx={(theme: Theme) => styles.tab(theme, tabRootSx)}
            label={data.title}
            icon={data.icon}
            {...tabProps}
          />
        ))}
      </Tabs>
      <Box sx={{ py: 2 }}>
        {arrayChildren.map((child, index) => {
          if (outerValue) {
            return <Box key={index}>{outerValue === index && child}</Box>;
          } 
            return <Box key={index}>{value === index && child}</Box>;
          
        })}
      </Box>
    </Box>
  );
}

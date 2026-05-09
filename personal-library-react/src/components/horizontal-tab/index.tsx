"use client";
import React, { useState, Children } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { styles } from "./tabs.styles";

interface Props {
  tabsArray?: string[];
  children?: React.ReactNode;
  Index?: number | null;
}

export default function HorizontalTabs({
  tabsArray = [],
  children,
  Index = 0,
}: Props): JSX.Element {
  const tabChildren = Children.toArray(children);
  const [value, setValue] = useState<number | null>(Index);
  return (
    <Box>
      <Box sx={styles.tabsWrapper}>
        <Tabs
          classes={{ root: "_root", indicator: "_indicator" }}
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          variant="scrollable"
        >
          {tabsArray.map((tab: string, index: number) => (
            <Tab
              disableRipple
              classes={{ root: "tab_root", selected: "_selected" }}
              key={index}
              label={tab}
              value={index}
            />
          ))}
        </Tabs>
      </Box>
      {tabChildren?.map(
        (child, index) => value === index && <Box key={index}>{child}</Box>
      )}
    </Box>
  );
}

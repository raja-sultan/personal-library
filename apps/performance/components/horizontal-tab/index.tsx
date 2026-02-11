"use client";
import React, { useState, Children, useEffect } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { styles } from "./tabs.styles";
import { useSelector } from "react-redux";

interface Props {
  tabsArray?: string[];
  permissionsArray?: { id: string; name: string }[];
  children?: React.ReactNode;
  Index?: number | null;
  onChange?: (newValue: number) => void;
}

export default function HorizontalTabs({
  tabsArray = [],
  permissionsArray,
  children,
  Index = 0,
  onChange = () => {
    ("");
  },
}: Props): JSX.Element {
  const tabChildren = Children.toArray(children);
  const [value, setValue] = useState<number | null>(0);
  const {
    user: { userPermissions },
  } = useSelector((state: any) => state.auth);

  useEffect(() => {
    Index && setValue(Index);
  }, [Index]);

  return (
    <Box>
      <Box className="tab_wrapper" sx={styles.tabsWrapper}>
        <Tabs
          classes={{ root: "_root", indicator: "_indicator" }}
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
          variant="scrollable"
        >
          {tabsArray.map((tab: string, index: number) =>
            permissionsArray?.[index]?.id && !Object.prototype.hasOwnProperty.call(userPermissions, permissionsArray[index]?.id) ? (
              <Tab disableRipple classes={{ root: "tab_root", selected: "_selected" }} key={tab} label={tab} value={index} />
            ) : (
              <Tab disableRipple classes={{ root: "tab_root", selected: "_selected" }} key={tab} label={tab} value={index} />
            )
          )}
        </Tabs>
      </Box>
      {tabChildren?.map((child, index) => {
        if (value === index) {
          if (permissionsArray?.[index]?.id && !Object.prototype.hasOwnProperty.call(userPermissions, permissionsArray[index]?.id)) {
            return <Box key={`child${value}`}>
              <Typography variant="body1" color="primary.main" textAlign='center'>
                You don&apos;t have permission to access this route.
              </Typography>
            </Box>;
          }
          return <Box key={`child${value}`}>{child}</Box>;
        }
        return null; // Ensuring a value is always returned
      })}
    </Box>
  );
}

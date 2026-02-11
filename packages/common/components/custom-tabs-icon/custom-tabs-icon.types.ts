import type { TabProps, TabsProps } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

export interface CustomTabsIconProps {
  children?: React.ReactNode;
  tabsNameArray: any;
  icon?: any;
  maxWidth?: number | undefined;
  tabsProps?: TabsProps;
  tabProps?: TabProps;
  tabsRootSx?: object;
  tabRootSx?: object;
  outerValue?: number;
  setOuterValue?: Dispatch<SetStateAction<number>> | undefined;
}

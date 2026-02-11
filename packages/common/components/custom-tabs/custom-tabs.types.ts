import type { TabProps, TabsProps } from "@mui/material";

export interface CustomTabsProps {
  children: React.ReactNode;
  tabsNameArray: string[];
  maxWidth?: number | undefined;
  tabsProps?: TabsProps;
  tabProps?: TabProps;
  tabsRootSx?:object;
  tabRootSx?:object;
}

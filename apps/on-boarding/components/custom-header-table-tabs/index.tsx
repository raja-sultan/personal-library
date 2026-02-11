"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import type { CustomTableWithHeaderProps } from "@components/custom-table-with-header/custom-table.interface";
import HorizontalTabs from "@components/horizontal-tab";

interface Props {
  headerProps?: {
    title?: string;
    description?: string;
    actions?: React.ReactNode;
  };
  tabsArray?: string[];
  children?: React.ReactNode;
  table?: CustomTableWithHeaderProps;
}

export function CustomHeaderTableTabs(props: Props): JSX.Element {
  const { headerProps, tabsArray, children, table } = props;

  return (
    <>
      {headerProps && (
        <CustomCard
          subHeader
          cardSubHeader={headerProps}
          cardProps={{ sx: { mb: "24px" } }}
        />
      )}
      {tabsArray && (
        <HorizontalTabs tabsArray={tabsArray}>{children}</HorizontalTabs>
      )}
      {table && <CustomTableWithHeader {...table} />}
    </>
  );
}

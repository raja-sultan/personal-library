"use client";
import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import React from "react";
import { EmployeesDirectory } from "./employees";
import { DepartmentDirectory } from "./department";

export function Directory(): JSX.Element {
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: 2.4 } }}
        subHeader
        cardSubHeader={{
          title: "Directory",
          description: "View the list of all employees and department",
        }}
      />
      <HorizontalTabs tabsArray={["Employees", "Departments"]}>
        <EmployeesDirectory />
        <DepartmentDirectory />
      </HorizontalTabs>
    </>
  );
}

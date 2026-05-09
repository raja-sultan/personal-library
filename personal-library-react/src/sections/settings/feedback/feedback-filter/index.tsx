import { TaskFilters } from "@sections/settings/tasks/filters";
import React from "react";

export function FeedbackFilter(): JSX.Element {
  return (
    <>
      <TaskFilters
        filterHeaderData={[
          {
            type: "select",
            outerLabel: "Department",
            FieldProps: {
              name: "department",
            },
            options: [
              { id: 1, value: "businessAnalysis", label: "Business Analysis" },
              { id: 2, value: "humanResources", label: "Human Resources" },
              { id: 3, value: "sales&marketing", label: "Sales & Marketing" },
            ],
          },
          {
            type: "select",
            outerLabel: "Location",
            FieldProps: {
              name: "location",
            },
            options: [
              {
                id: 1,
                label: "Dublin Office",
                value: "dublinOffice",
              },
              {
                id: 2,
                label: "Glasgow Office",
                value: "glasgowOffice",
              },
              {
                id: 3,
                label: "London Office",
                value: "londonOffice",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Employment Status",
            FieldProps: {
              name: "employee_status",
            },
            options: [
              {
                id: 1,
                label: "Contact",
                value: "Contact",
              },
              {
                id: 2,
                label: "Full-time",
                value: "full-time",
              },
              {
                id: 3,
                label: "Intern",
                value: "intern",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Other Criteria",
            FieldProps: {
              name: "other_Criteria",
            },
            options: [
              {
                id: 1,
                label: "Welcome Email",
                value: "welcomeEmail",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Who is Responsible",
            FieldProps: {
              name: "responsibleFor",
            },
            options: [
              {
                id: 1,
                label: "New Hire",
                value: "newHire",
              },
              {
                id: 2,
                label: "Manager",
                value: "manager",
              },
              {
                id: 3,
                label: "Onboarding Coordinator",
                value: "onboardingCoordinator",
              },
              {
                id: 4,
                label: "Employees",
                value: "Employees",
              },
            ],
          },
        ]}
        filterButtonShow
        onChanged={(e) => {
          console.log(e);
        }}
      />
    </>
  );
}

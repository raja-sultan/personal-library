import { TableHeader } from "common";
import UsePageFilters from "./use-page-filters";

export function PageFilters(): JSX.Element {
  const { departmentOptions, locationListOptions, criteriaListOptions, setParams } =
    UsePageFilters();

  return (
    <>
      <TableHeader
        showClearFilterButton
        gridProps={{
          // xl: 5.7,
          lg: 2.1,
          // md: 5.4,
        }}
        onChanged={(e: any) => {
          setParams(e);
        }}
        tableHeaderData={[ 
          {
            type: "select",
            FieldProps: {
              name: "location",
              label: "Employee's Location",
            },
            options: locationListOptions ?? [
              {
                id: 1,
                label: "No location Found",
                value: "No location Found",
              },
            ],
          },
          {
            type: "select",
            FieldProps: {
              name: "department",
              label: "Employee's Department",
            },
            options: departmentOptions ?? [
              {
                id: 1,
                label: "No Department Found",
                value: "No Department Found",
              },
            ],
          },

          {
            type: "select",
            FieldProps: {
              name: "status",
              label: "Employee's Status",
            },
            options: [
              {
                label: "Part Time",
                value: "partTime",
              },
              {
                label: "Full Time",
                value: "fullTime",
              },
              {
                label: "Contract",
                value: "contract",
              },
              {
                label: "Permanent",
                value: "permanent",
              },
              {
                label: "Intern",
                value: "Intern",
              },
              {
                label: "Temporary",
                value: "temporary",
              },
              {
                label: "Terminated",
                value: "terminated",
              },
            ],
          },
          {
            type: "multiselect",
            FieldProps: {
              name: "criteria",
              label: "Employee's Criteria",
            },
            options: criteriaListOptions ?? [
              {
                id: 1,
                label: "No Criteria Found",
                value: "No Criteria Found",
              },
            ],
          },
        ]}
      />
    </>
  );
}

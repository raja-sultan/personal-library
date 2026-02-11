import { TaskFilters } from "@sections/settings/tasks/filters";
import { CustomTable } from "common";
import UsePendingHireReport from "./use-pending-hires-reports";

export function PendingHireReport(): JSX.Element {
  const { departmentOptions, locationListOptions, criteriaListOptions } =
    UsePendingHireReport();

  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <>Name</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.startDate ?? "-",
      id: "startDate",
      cell: (info: any) => info.getValue(),
      header: () => <>Start Date</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.manager ?? "-",
      id: "manager",
      cell: (info: any) => info.getValue(),
      header: () => <>Manager</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.location ?? "-",
      id: "location",
      cell: (info: any) => info.getValue(),
      header: () => <>Location</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.department ?? "-",
      id: "department",
      cell: (info: any) => info.getValue(),
      header: () => <>Department</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.employmentStatus ?? "-",
      id: "employmentStatus",
      cell: (info: any) => info.getValue(),
      header: () => <>Employment Status</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.otherCriteria ?? "-",
      id: "otherCriteria",
      cell: (info: any) => info.getValue(),
      header: () => <>Other Criteria</>,
      isSortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Waleed Saleh",
      startDate: "20/12/2020",
      manager: "Faisel Naeem",
      location: "London",
      department: "Business Analyst",
      employmentStatus: "Full Time",
      otherCriteria: "Welcome Email",
    },
  ];
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
            outerLabel: "Location",
            FieldProps: {
              name: "location",
            },
            options: locationListOptions ?? [
              {
                id: 1,
                label: "No Location Found",
                value: "No Location Found",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Employment Status",
            FieldProps: {
              name: "employmentStatus",
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
            type: "select",
            outerLabel: "Other Criteria",
            FieldProps: {
              name: "otherCriteria",
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
        filterButtonShow
        onChanged={(e) => {
          console.log(e);
        }}
      />
      <CustomTable data={data} columns={columns} isSuccess />
    </>
  );
}

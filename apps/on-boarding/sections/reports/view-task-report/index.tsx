import {
  Box,
  Button,
  Popover,
  Typography,
  useTheme,
  Checkbox,
} from "@mui/material";
import { TaskFilters } from "@sections/settings/tasks/filters";
import { CustomTable } from "common";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import UsViewTaskFilters from "./use-view-task-report";

export function ViewTaskReport(): JSX.Element {
  const {
    departmentOptions,
    locationListOptions,
    criteriaListOptions,
    setParams,
  } = UsViewTaskFilters();

  const theme = useTheme();
  const [rangeState, setRangeState] = useState<any[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null | any>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  const columns = [
    {
      accessorFn: (row: any) => row?.taskName ?? "-",
      id: "taskName",
      cell: (info: any) => info.getValue(),
      header: () => <>Task Name</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.completingFor ?? "-",
      id: "completingFor",
      cell: (info: any) => info.getValue(),
      header: () => <>Completing For</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.dateAssigned ?? "-",
      id: "dateAssigned",
      cell: (info: any) => info.getValue(),
      header: () => <>Date Assigned</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.dueDate ?? "-",
      id: "dueDate",
      cell: (info: any) => info.getValue(),
      header: () => <>Due Date</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.assignedTo ?? "-",
      id: "assignedTo",
      cell: (info: any) => info.getValue(),
      header: () => <>Assigned to</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.complete ?? "-",
      id: "complete",
      cell: (info: any) => (
        <Box>
          <Checkbox checked={info.getValue()} color="primary" />
        </Box>
      ),
      header: () => <>Complete</>,
      isSortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      taskName: "Add new hire to HR systems",
      completingFor: "Faisal Naeem",
      dateAssigned: "April 8, 2023",
      dueDate: "April 10, 2023",
      assignedTo: "Waleed Saleh",
      complete: false,
    },
    {
      id: 2,
      taskName: "Care Training",
      completingFor: "Ashes",
      dateAssigned: "April 13, 2023",
      dueDate: "April 19, 2023",
      assignedTo: "Waleed Saleh",
      complete: false,
    },
    {
      id: 3,
      taskName: "Add new hire to HR systems",
      completingFor: "Faisal Siraj",
      dateAssigned: "April 24, 2023",
      dueDate: "April 29, 2023",
      assignedTo: "Waleed Saleh",
      complete: true,
    },
  ];
  return (
    <>
      <Typography variant="h5">Task Assigned</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          sx={{ mr: 1 }}
          onClick={handleClick}
        >
          Apply Date Range
        </Button>
        <Popover
          id={id}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <DateRange
            editableDateInputs
            onChange={(item: any) => {
              setRangeState([item?.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={rangeState}
            color={theme?.palette?.primary?.main}
            rangeColors={[theme?.palette?.primary?.main]}
          />
        </Popover>
      </Box>

      <TaskFilters
        gridProps={{
          lg: 3,
        }}
        filterHeaderData={[
          {
            type: "select",
            outerLabel: "Who is responsible",
            FieldProps: {
              name: "whoIsResponsible",
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
          {
            type: "select",
            outerLabel: "Person the task is for",
            FieldProps: {
              name: "personTheTask",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Person’s Department",
            FieldProps: {
              name: "PersonDepartments",
            },
            options: departmentOptions ?? [
              {
                id: 1,
                value: "department",
                label: "No Department Found",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Person’s Location",
            FieldProps: {
              name: "personLocation",
            },
            options: locationListOptions ?? [
              { id: 1, value: "location", label: "No location Found" },
            ],
          },
          {
            type: "select",
            outerLabel: "Person’s Employment Status",
            FieldProps: {
              name: "personEmploymentStatus",
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
              // {
              //   label: "Permanent",
              //   value: "permanent",
              // },
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
            outerLabel: "Person’s Other Criteria",
            FieldProps: {
              name: "personOtherCriteria",
            },
            options: criteriaListOptions ?? [
              {
                id: 1,
                label: "No Criteria Found",
                value: "criteria",
              },
            ],
          },
        ]}
        filterButtonShow
        onChanged={(e) => {
          console.log(e);
        }}
      />
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
        Showing 8 0f 8 Tasks assigned to New Hires
      </Typography>
      <CustomTable data={data} columns={columns} isSuccess />
    </>
  );
}

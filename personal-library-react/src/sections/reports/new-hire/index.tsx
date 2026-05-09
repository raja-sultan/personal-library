import { Box, Button, Popover, useTheme } from "@mui/material";
import { TaskFilters } from "@sections/settings/tasks/filters";
import { CustomTable } from "common";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

export function NewHireReport(): JSX.Element {
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
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <>Name</>,
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
      accessorFn: (row: any) => row?.department ?? "-",
      id: "department",
      cell: (info: any) => info.getValue(),
      header: () => <>Department</>,
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
      accessorFn: (row: any) => row?.startDate ?? "-",
      id: "startDate",
      cell: (info: any) => info.getValue(),
      header: () => <>Start Date</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.goalsAssigned ?? "-",
      id: "goalsAssigned",
      cell: (info: any) => info.getValue(),
      header: () => <>Goals Assigned</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.goalsCompleted ?? "-",
      id: "goalsCompleted",
      cell: (info: any) => info.getValue(),
      header: () => <>Goals Completed</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.signatureRequested ?? "-",
      id: "signatureRequested",
      cell: (info: any) => info.getValue(),
      header: () => <>Signature Requested</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.openTasks ?? "-",
      id: "openTasks",
      cell: (info: any) => info.getValue(),
      header: () => <>Open Tasks</>,
      isSortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Valeed Saleh",
      manager: "Valeed Saleh",
      department: "BA",
      location: "London",
      startDate: "April 2012",
      goalsAssigned: 5,
      goalsCompleted: "33%",
      signatureRequested: 3,
      openTasks: 3,
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleClick}>
          Apply Date Range
        </Button>
        <Button variant="contained">Add New Hire</Button>
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
        filterHeaderData={[
          {
            type: "select",
            outerLabel: "Departments",
            FieldProps: {
              name: "departments",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Locations",
            FieldProps: {
              name: "location",
            },
            options: [
              {
                id: 1,
                label: "Location 1",
                value: "Location",
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

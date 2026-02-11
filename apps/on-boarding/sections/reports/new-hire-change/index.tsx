import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
import { TaskFilters } from "@sections/settings/tasks/filters";
import { CustomTable } from "common";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

export function ViewNewHireChange(): JSX.Element {
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
      accessorFn: (row: any) => row?.newHire ?? "-",
      id: "newHire",
      cell: (info: any) => info.getValue(),
      header: () => <>New Hire</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.changeType ?? "-",
      id: "changeType",
      cell: (info: any) => info.getValue(),
      header: () => <>Change Type</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.details ?? "-",
      id: "details",
      cell: (info: any) => info.getValue(),
      header: () => <>Details</>,
      isSortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      newHire: "new hire",
      changeType: "Add new hire to HR systems",
      details: "New hiring",
    },
  ];
  return (
    <>
      <Typography variant="h5">New Hire Changes</Typography>
      <Typography variant="body1">New Hiring Updates From Personnel Library</Typography>
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
        <Button
          size="small"
          variant="contained"
          disableRipple
          disableElevation
          disableFocusRipple
          disableTouchRipple
        >
          Export to CSV
        </Button>
      </Box>

      <TaskFilters
        filterHeaderData={[
          {
            type: "select",
            outerLabel: "Who is responsible",
            FieldProps: {
              name: "whoIsResponsible",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
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
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Person’s Location",
            FieldProps: {
              name: "personLocation",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Person’s Employment Status",
            FieldProps: {
              name: "personEmploymentStatus",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Person’s Other Criteria",
            FieldProps: {
              name: "personOtherCriteria",
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
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
      Showing 8 0f 8 Hiring Changes
      </Typography>
      <CustomTable data={data} columns={columns} isSuccess />
    </>
  );
}

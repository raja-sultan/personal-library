import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
import { TaskFilters } from "@sections/settings/tasks/filters";
import { CustomTable } from "common";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

export function ViewFeedbackReportSection(): JSX.Element {
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
      accessorFn: (row: any) => row?.startDate ?? "-",
      id: "startDate",
      cell: (info: any) => info.getValue(),
      header: () => <>Start Date</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.question ?? "-",
      id: "question",
      cell: (info: any) => info.getValue(),
      header: () => <>Question</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.answered ?? "-",
      id: "answered",
      cell: (info: any) => info.getValue(),
      header: () => <>Answered</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.yesNo ?? "-",
      id: "yesNo",
      cell: (info: any) => info.getValue(),
      header: () => <>Yes/No</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.comment ?? "-",
      id: "comment",
      cell: (info: any) => info.getValue(),
      header: () => <>Comment</>,
      isSortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      newHire: "Aqib Naseem",
      startDate: "April 8, 2023",
      question: "Are you feeling excited by your new role?",
      answered: "April 10, 2023",
      yesNo: "Yes",
      comment: "I’m excited",
    },
    {
      id: 2,
      newHire: "Ateeq ur Rehman",
      startDate: "April 8, 2023",
      question: "Have you talked with anyone outside of your department/team?",
      answered: "April 10, 2023",
      yesNo: "No",
      comment: "--",
    },
    {
      id: 3,
      newHire: "Faisal Naeem",
      startDate: "April 8, 2023",
      question: "Are you feeling excited by your new role?",
      answered: "April 10, 2023",
      yesNo: "Yes",
      comment: "I’m really excited",
    },
  ];
  return (
    <>
      <Typography variant="h5">Feedback</Typography>
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
            outerLabel: "Employee’s Name",
            FieldProps: {
              name: "employeeName",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Employee’s Answer",
            FieldProps: {
              name: "employeeAnswer",
            },
            options: [{ id: 1, value: "departments", label: "Departments 1" }],
          },
          {
            type: "select",
            outerLabel: "Employee’s Department",
            FieldProps: {
              name: "employeeDepartment",
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
            outerLabel: "Other Criteria",
            FieldProps: {
              name: "otherCriteria",
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
        Showing 8 0f 8 Feedback Responses
      </Typography>

      <CustomTable data={data} columns={columns} isSuccess />
    </>
  );
}

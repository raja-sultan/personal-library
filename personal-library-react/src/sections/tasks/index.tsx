import React, { useState } from "react";
import { Box, Typography, Paper, Checkbox, Button } from "@mui/material";
import { CustomTable, TableHeader } from "common";
import type { ITableHeaderData } from "@type/table-header";
import ViewTaskModel from "./view-task-model";

const tableHeaderData: ITableHeaderData[] = [
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "Search",
    },
  },
  {
    type: "checkbox",
    FieldProps: {
      name: "includeCompletedTasks",
      label: "Include Completed Tasks",
    },
  },
];

export function TasksSection(): JSX.Element {
  const columns = [
    {
      id: "select",
      header: ({ table }: any) => {
        return (
          <Box>
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Box>
        );
      },
      cell: ({ row }: any) => (
        <Box>
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.taskName,
      id: "taskName",
      cell: (info: any) => (
        <Box>
          <ViewTaskModel label={info.getValue() ?? "-"} />
        </Box>
      ),
      header: () => <span>Task Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.completingFor ?? "-",
      id: "completingFor",
      cell: (info: any) => info.getValue(),
      header: () => <span>Completing For</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.dateAssigned ?? "-",
      id: "dateAssigned",
      cell: (info: any) => info.getValue(),
      header: () => <span>Date Assigned</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.dueDate ?? "-",
      id: "dueDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Due Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.assignedTo ?? "-",
      id: "assignedTo",
      cell: (info: any) => info.getValue(),
      header: () => <span>Assigned to</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.complete ?? "-",
      id: "complete",
      cell: () => (
        <Box>
          <Checkbox color="primary" />
        </Box>
      ),
      header: () => <span>complete</span>,
      isSortable: false,
    },
  ];
  const [show, setShow] = useState(false);

  const handleSelected = (e: any) => {
    if (e.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const data = [
    {
      taskName: "Add new hire to HR systems",
      completingFor: "Faisal Naeem",
      dateAssigned: "April 8, 2023",
      dueDate: "April 8, 2023",
      assignedTo: "April 8, 2023",
      complete: false,
    },
  ];
  return (
    <Paper sx={{ p: 2, backgroundColor: "background.paper" }}>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="h5">Tasks Assigned</Typography>
      </Box>
      <Box>
        <TableHeader
          showClearFilterButton
          tableHeaderData={tableHeaderData}
          gridProps={{ lg: 2.5 }}
        />
      </Box>
      <Box sx={{ my: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Showing 8 0f 8 Tasks assigned to New Hires
        </Typography>
        {show && (
          <Box ml="auto" display="flex" alignItems="center" gap={0.5}>
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
            <Button
              size="small"
              variant="contained"
              disableRipple
              disableElevation
              disableFocusRipple
              disableTouchRipple
            >
              Bulk Actions
            </Button>
          </Box>
        )}
      </Box>
      <Paper variant="elevation" elevation={2}>
        <Box sx={{ py: 2, px: 2, pb: 0.5 }}>
          <CustomTable
            data={data}
            columns={columns}
            isLoading={false}
            isFetching={false}
            isError={false}
            isSuccess
            isPagination
            showSerialNo={false}
            onSelected={handleSelected}
          />
        </Box>
      </Paper>
    </Paper>
  );
}

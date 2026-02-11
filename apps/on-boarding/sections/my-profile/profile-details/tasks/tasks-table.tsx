import { Box, Card, CardContent, MenuItem } from "@mui/material";
import { CustomTable, TableAction } from "common";
import { useState } from "react";
import dayjs from "dayjs";
import { tableData } from "./tasks.data";
import ViewTaskModal from "./view-task-modal";
import CreateTaskModal from "./create-task";

export function TasksTable(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.for ?? "-",
      id: "for",
      cell: (info: any) => info.getValue(),
      header: () => <span>For</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.dueDate ?? "-",
      id: "dueDate",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Due Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "-",
      id: "Actions",
      cell: () => {
        return (
          <TableAction>
            <MenuItem
              onClick={() => {
                setEdit(true);
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem>Mark as incomplete</MenuItem>
          </TableAction>
        );
      },
      header: () => <span>Action</span>,
    },
  ];

  return (
    <Card>
      <CardContent sx={{ pt: 2 }}>
        <CustomTable
          data={tableData}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination
          isSuccess
          showSerialNo
          //totalPages={data?.data?.meta?.pages ?? 0}
          //currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </CardContent>
      {open && <CreateTaskModal open={open} setOpen={setOpen} />}
      {edit && <ViewTaskModal edit={edit} setEdit={setEdit} />}
    </Card>
  );
}

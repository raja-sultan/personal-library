import React, { useState } from "react";
import { Box, Checkbox, MenuItem, Paper } from "@mui/material";
import { TaskModal } from "./task-modal";
import {CustomTable,TableHeader,TableIconActions,WarningPrompt,} from "common";
import { tableDataSelectField, updateData } from "./task.header.data";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {useDeleteTaskMutation,useGetTaskInfoQuery,useUpdateTaskMutation,} from "@services/sourcing/tasks";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { JobDetailsHeader } from "../job-details-header";

export function TaskSection(): JSX.Element {
  // const [search, setSearch] = useState<any>();
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetTaskInfoQuery({
      params: {
        limit: 10,
        // offset: params.offset,
        // ...search,
        ...params,
      },
    });

  const [deleteTask] = useDeleteTaskMutation();
  const deleteJobTask = (id): void => {
    const formData = {
      jobId: id,
    };
    deleteTask(formData)
      .unwrap()
      .then(() => {
        toast.success("Information Deleted Successfully");
      })
      .catch((error: { data: { message: any } }) => {
        const errMsg = error?.data?.message;
        toast.error(`${errMsg}`);
      });
  };
  const [updateTask] = useUpdateTaskMutation();
  const completeAsMark = async (apiData: any) => {
    const sendData: any = {};
    for (const key in updateData) {
      if (apiData[key] !== undefined) {
        sendData[key] = apiData[key];
      }
    }
    sendData.complete = apiData.complete !== true;
    try {
      await updateTask({
        body: {
          ...sendData,
        },
        params: {
          id: apiData?._id,
        },
      }).unwrap();
      toast.success("successful");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const TaskTableColumns = [
    {
      accessorFn: (row: any) => row.category,
      id: "category",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Category</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.taskDescription,
      id: "taskDescription",
      cell: (info: any) => info.getValue(),
      header: () => <span>Task </span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.assigneeName,
      id: "assigneeName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Assigned To</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.dueDate,
      id: "dueDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => <span>Due Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.complete,
      id: "Complete",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <Checkbox
            onChange={() => {
              return completeAsMark(info.row.original);
            }}
            checked={info.getValue()}
            color="secondary"
          />
        </Box>
      ),
      header: () => <span>Complete</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.Action,
      id: "Action",
      cell: (info) => (
        <Box display="flex" justifyContent="flex-start">
          <TableIconActions icon={<TableActionsIcon />}>
            <TaskModal
              apiData={info.row.original}
              headerLabel="View Task"
              action="view"
            />
            <TaskModal
              headerLabel="Edit Task"
              submitLabel="Update Task"
              action="edit"
              apiData={info.row.original}
            />
            <WarningPrompt
              mainColor="error.main"
              heading="Delete Task"
              subTitle="Are you sure you want to delete this task?"
              modelOpenLabel={<MenuItem sx={{ fontSize: 16 }}>Delete</MenuItem>}
              acceptButtonLabel="Yes,sure!"
              acceptButtonProps={{
                onClick: () => {
                  deleteJobTask(info.row.original._id);
                },
                variant: "contained",
                sx: { backgroundColor: "error.main" },
              }}
            />
            <MenuItem
              onClick={() => {
                return completeAsMark(info.row.original);
              }}
            >
              {info.row.original.complete ? "Reopen Task" : "Mark as Complete"}
            </MenuItem>
          </TableIconActions>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];
  return (
    <Box mt={1}>
      <Paper variant="elevation" elevation={1}>
        <JobDetailsHeader mainTitle="Tasks" />
        <Box p={2}>
          <Box mb={3} sx={{ display: "flex", alignItems: "center" }}>
            <TableHeader
              showClearFilterButton
              onChanged={(e: any) => {
                setParams((pre) => {
                  return {
                    ...pre,
                    offset: 0,
                    ...e,
                  };
                });
              }}
              tableHeaderData={tableDataSelectField}
              gridProps={{ lg: 2.8 }}
            />
            <Box>
              <TaskModal
                headerLabel="Add Task"
                submitLabel="Create Task"
                action="add"
              />
            </Box>
          </Box>
          <CustomTable
            data={data?.data?.task}
            columns={TaskTableColumns}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess}
            isPagination
            // currentPage={1}
            totalPages={data?.data?.meta?.pages ?? 0}
            currentPage={data?.data?.meta?.page ?? 1}
            onPageChange={(onPageData: any) => {
              setParams((pre) => {
                return {
                  ...pre,
                  offset: (onPageData - 1) * 10,
                };
              });
            }}
            // onSortByChange={(onSortData: any) => {
            //   return onSortData;
            // }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

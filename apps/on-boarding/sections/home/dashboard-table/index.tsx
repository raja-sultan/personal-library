import React from "react";
import { CustomTable, CustomTabs } from "common";
import { Typography } from "@mui/material";
import { HomeCard } from "@components/custom-home-card/custom-home-card";

// My Tasks Data
export const MyTasksData = [
  {
    id: 1,
    name: "Andrew Jones",
    for: "Manger ",
    dueDate: "28 Aug, 2024",
    status: "To do",
  },
  {
    id: 2,
    name: "Andrew Jones",
    for: "Manger ",
    dueDate: "28 Aug, 2024",
    status: "To do",
  },
];

export const MyTasksColumns = [
  {
    accessorFn: (row: any) => row?.name ?? "-",
    id: "name",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.name ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.for ?? "-",
    id: "for",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.for ?? "-"}
        </Typography>
      );
    },
    header: () => <span>For</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.dueDate ?? "-",
    id: "dueDate",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.dueDate ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Due Date</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.status ?? "-",
    id: "status",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.status ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Status</span>,
    isSortable: false,
  },
];

// New Hire Feedback Data
export const NewHireFeedbackData = [
  {
    id: 1,
    newHires: "Andrew Jones",
    startDate: "24 Aug, 2023",
    questionsAsked: "02",
    answered: "02",
  },
  {
    id: 1,
    newHires: "Andrew Jones",
    startDate: "24 Aug, 2023",
    questionsAsked: "02",
    answered: "02",
  },
  {
    id: 1,
    newHires: "Andrew Jones",
    startDate: "24 Aug, 2023",
    questionsAsked: "02",
    answered: "02",
  },
];

export const NewHireFeedbackColumns = [
  {
    accessorFn: (row: any) => row?.newHires ?? "-",
    id: "newHires",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.newHires ?? "-"}
        </Typography>
      );
    },
    header: () => <span>New Hire</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.startDate ?? "-",
    id: "startDate",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.startDate ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Start Date</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.questionsAsked ?? "-",
    id: "questionsAsked",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.questionsAsked ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Question Asked</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.answered ?? "-",
    id: "answered",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.answered ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Answered</span>,
    isSortable: false,
  },
];

// New Hire  By Start Date Data
export const NewHireByStartDateData = [
  {
    id: 1,
    startDate: "24 Aug, 2023",
    hires: "02",
    tasks: "2 pending tasks",
    progress: "1 document to sign",
  },
  {
    id: 2,
    startDate: "24 Aug, 2023",
    hires: "08",
    tasks: "no pending tasks",
    progress: "1 document to sign",
  },
  {
    id: 3,
    startDate: "24 Aug, 2023",
    hires: "02",
    tasks: "2 pending tasks",
    progress: "1 document to sign",
  },
];

export const NewHireByStartDateColumns = [
  {
    accessorFn: (row: any) => row?.startDate ?? "-",
    id: "startDate",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.startDate ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Start Date</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.hires ?? "-",
    id: "hires",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.hires ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Hires</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.tasks ?? "-",
    id: "tasks",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.tasks ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Tasks</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.progress ?? "-",
    id: "progress",
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.row.original?.progress ?? "-"}
        </Typography>
      );
    },
    header: () => <span>Progress</span>,
    isSortable: false,
  },
];

export function DashboardTableSection(): JSX.Element {
  return (
    <HomeCard>
      <CustomTabs
        tabsNameArray={[
          "My Tasks",
          "New Hire Feedback",
          "New Hire by Start Date",
        ]}
      >
        <CustomTable
          data={MyTasksData}
          columns={MyTasksColumns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
        />
        <CustomTable
          data={NewHireFeedbackData}
          columns={NewHireFeedbackColumns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
        />
        <CustomTable
          data={NewHireByStartDateData}
          columns={NewHireByStartDateColumns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
        />
      </CustomTabs>
    </HomeCard>
  );
}

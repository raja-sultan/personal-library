import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomTable } from "common";

export function OrderHistorySec(): JSX.Element {
  const data = [
    {
      id: 1,
      invoice: "23567788",
      description:
        "Customized the time and frequency that scorecard reminders are sent to interviewers.",
      date: "March, 20, 2023",
      job: "March, 20, 2023",
      purchaser: "David Miller",
      amount: "$30",
    },
    {
      id: 2,
      invoice: "23567788",
      description:
        "Customized the time and frequency that scorecard reminders are sent to interviewers.",
      date: "March, 20, 2023",
      job: "March, 20, 2023",
      purchaser: "David Miller",
      amount: "$30",
    },
    {
      id: 3,
      invoice: "23567788",
      description:
        "Customized the time and frequency that scorecard reminders are sent to interviewers.",
      date: "March, 20, 2023",
      job: "March, 20, 2023",
      purchaser: "David Miller",
      amount: "$30",
    },
  ];

  const columns = [
    {
      accessorFn: (row: any) => row.invoice,
      id: "invoice",
      header: () => <Box>invoice #</Box>,
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.description,
      id: "description",
      header: () => <Box>description Address</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.date,
      id: "date",
      header: () => <Box>date</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.purchaser,
      id: "purchaser",
      header: () => <Box>purchaser</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.job,
      id: "job",
      header: () => <Box>job</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.amount,
      id: "amount",
      header: () => <Box>amount</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Order History
      </Typography>
      <CustomTable
        data={data}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isSuccess
        isPagination={false}
      />
    </Box>
  );
}

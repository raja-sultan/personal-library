import { Box, Typography, Switch } from "@mui/material";
import { CustomTable } from "common";

export function OnboardingCoreEmailTable(): React.JSX.Element {
  const TableMockData = [
    {
      id: 1,
      title: "Weekly task summary",
      description: "List of outstanding tasks",
      delivery: "Monday, 8pm",
    },
    {
      id: 2,
      title: "Tasks assigned",
      description: "Notifications of tasks assigned",
      delivery: "Monday, 8pm",
    },
  ];

  const columns = [
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "title",
      cell: () => <Switch />,
      header: () => <span>Published</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.candidates ?? "-",
      id: "candidates",
      cell: (info: any) => {
        return (
          <>
            <Typography variant="body2" fontWeight={500}>
              {info.row.original?.title ?? "-"}
            </Typography>
            <Typography variant="subtitle2" color="text.disabled">
              {info.row.original?.description ?? "-"}
            </Typography>
          </>
        );
      },
      header: () => <span>Email Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.delivery ?? "-",
      id: "delivery",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Delivery</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.delivery ?? "-",
      id: "delivery",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Send to</span>,
      isSortable: false,
    },
  ];
  return (
    <CustomTable
      data={TableMockData}
      columns={columns}
      isLoading={false}
      isFetching={false}
      isError={false}
      isPagination={false}
      isSuccess
    />
  );
}

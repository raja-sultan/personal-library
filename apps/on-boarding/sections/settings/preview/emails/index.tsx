import { Stack, Typography } from "@mui/material";
import { CustomTable } from "common";

export function Emails(): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Email Title</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Send Date</span>,
      isSortable: false,
    },
  ];
  return (
    <Stack rowGap={2}>
      <Typography variant="body1" fontWeight={600}>
        Emails
      </Typography>
      <CustomTable
        data={{}}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isPagination={false}
        isSuccess
      />
    </Stack>
  );
}

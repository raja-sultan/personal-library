import { Avatar, Box, Card } from "@mui/material";
import { CustomTable } from "common";
import CommonProfileCard from "./common-card";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export const tableData = [
  {
    id: 1,
    name: "Martha Stewart",
    title: "Product Owner",
  },
];

export function DirectReportsTable({ data }: any): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Box sx={{ mb: -0.5 }}>{info.getValue()}</Box>
          </Box>
        );
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "department",
      cell: (info: any) => info.getValue(),
      header: () => <span>Title</span>,
      isSortable: false,
    },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <CommonProfileCard
        title="Direct Reports"
        icon={
          <GroupsOutlinedIcon
            sx={{ color: "primary.main", fontSize: "30px" }}
          />
        }
      />
      <CustomTable
        data={[data?.data]}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isPagination={false}
        isSuccess
        showSerialNo
      />
    </Card>
  );
}

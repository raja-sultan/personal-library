import { Avatar, Box, Card } from "@mui/material";
import { CustomTable } from "common";
import CommonProfileCard from "./common-card";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { awsBaseUrl } from "@root/config";

export const tableData = [
  {
    id: 1,
    name: "Martha Stewart",
    title: "Product Owner",
  },
];

export function ManagerTable({ data }: any): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) =>
        `${row?.manager?.firstName ? row?.manager?.firstName : "--"} ${
          row?.manager?.lastName ? row?.manager?.lastName : "--"
        }`,
      id: "name",
      cell: (info: any) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              alt="Remy Sharp"
              src={`${awsBaseUrl}${data?.data?.profileImage}`}
            />
            <Box sx={{ mb: -0.5 }}>{info.getValue()}</Box>
          </Box>
        );
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.employeeTitle ?? "-",
      id: "employeeTitle",
      cell: (info: any) => info.getValue(),
      header: () => <span>Title</span>,
      isSortable: false,
    },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <CommonProfileCard
        title="Manager"
        icon={
          <AccountCircleOutlinedIcon
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

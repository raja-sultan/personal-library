
import { Box } from "@mui/system";
import { CustomTable } from "common";

export const data=[
    {
      "FirstName": "David",
      "LastName": "Miller",
      "Title": "12/11/2023",
  },
  {
    "FirstName": "Miller",
    "LastName": "David",
    "Title": "12/11/2023",
}
  ]
const TaskTableColumns = [
    {
      accessorFn: (row: any) => row.FirstName,
      id: "Name:",
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
      header: () => <span>First Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.LastName,
      id: "Prospect Added By",
      cell: (info: any) => info.getValue(),
      header: () => <span>Last Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.Title,
      id: "Date",
      cell: (info: any) => info.getValue(),
      header: () => <span>Title</span>,
      isSortable: false,
    },
  
  ];
export function FirstContact(): JSX.Element {
    return  <CustomTable
    data={data}
    columns={TaskTableColumns}
    isSuccess
    isPagination={false}
    onSortByChange={(onSortData: any) => {
      return onSortData;
    }}
  />
  }
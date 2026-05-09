import { Box, Card, CardContent, MenuItem } from "@mui/material";
import { CustomChip, CustomTable, TableAction, WarningPrompt } from "common";
import { useState } from "react";
import dayjs from "dayjs";
import { tableData } from "./documents-data";

export function DocumentsTable(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  //Status Function
  function getColorBasedOnStatus(
    info: any
  ): "success" | "warning" | "danger" | "started" {
    if (info.row.original.status === "Signed") {
      return "success";
    } else if (info.row.original.status === "Pending") {
      return "warning";
    }
    return "started";
  }

  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.source ?? "-",
      id: "source",
      cell: (info: any) => info.getValue(),
      header: () => <span>Source</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.addedDate ?? "-",
      id: "addedDate",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Added Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.status ?? "-",
      id: "status",
      cell: (info: any) => {
        return (
          <CustomChip
            ChipProps={{ label: info.getValue() }}
            variant={getColorBasedOnStatus(info)}
          />
        );
      },
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.signedDate ?? "-",
      id: "signedDate",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Signed Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "-",
      id: "Actions",
      cell: () => {
        return (
          <TableAction>
            <MenuItem>Download</MenuItem>
            <WarningPrompt
              mainColor="error.main"
              heading="Alert"
              subTitle="Are you sure you want to delete this document?"
              modelOpenLabel={<MenuItem>Delete</MenuItem>}
              acceptButtonLabel="Delete"
              acceptButtonProps={{
                onClick: () => {},
                variant: "contained",
                color: "error",
                sx: {
                  bgcolor: "error.main",
                  color: "primary.contrastText",
                },
              }}
            />
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
    </Card>
  );
}

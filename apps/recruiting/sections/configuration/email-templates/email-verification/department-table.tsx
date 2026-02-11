import { Card, CardContent } from "@mui/material";
import { CustomTable } from "common";
import { useState } from "react";
import { useGetEmailTemplatesQuery } from "@services/configuration/email-templates/email-templates-api";

export function DepartmentTable(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.type ?? "-",
      id: "type",
      cell: (info: any) => info.getValue(),
      header: () => <span>Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.priority ?? "-",
      id: "priority",
      cell: (info: any) => info.getValue(),
      header: () => <span>Priority</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.hostName ?? "-",
      id: "hostName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Hostname</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.requiredValue ?? "-",
      id: "requiredValue",
      cell: (info: any) => info.getValue(),
      header: () => <span>Required Value</span>,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => info.getValue(),
      header: () => <span>Status</span>,
    },
  ];

  // API HANDLER For BackUp API
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetEmailTemplatesQuery({
      params: {
        limit: 10,
        offset: params.offset,
        ...params,
      },
    });

  return (
    <Card sx={styles.mainCard}>
      <CardContent sx={{ pt: 2 }}>
        <CustomTable
          // data={data?.data?.backups}
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
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

const styles = {
  mainCard: {
    borderRadius: "10px",
    outline: "none",
    border: "none",
    backgroundColor: "background.paper",
  },
  backupTitle: { fontSize: "24px", fontWeight: 600, mb: 3 },
};

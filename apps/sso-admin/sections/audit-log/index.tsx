import { Box, Card, CardContent, Typography } from "@mui/material";
import { CustomTable, TableHeader } from "common";
import { styles } from "./audit-log.styles";
import { auditLog } from "./audit-log.data";
import { useState } from "react";
import { useGetAuditLogDetailsQuery } from "@services/sso-admin/audit-log/audit-log-api";

export function AuditLogSection(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const [search, setSearch] = useState<any>();

  const columns = [
    {
      accessorFn: (row: any) =>
        `${row?.user?.firstName}${" "}${row?.user?.lastName}`,
      id: "name",
      cell: (info: any) => {
        return <Box>{info.getValue()}</Box>;
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.eventName ?? "-",
      id: "eventName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Event Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.eventTime ?? "-",
      id: "eventTime",
      cell: (info: any) => info.getValue(),
      header: () => <span>Event Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.eventDate ?? "-",
      id: "eventDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Event Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.ipAddress ?? "-",
      id: "ipAddress",
      cell: (info: any) => info.getValue(),
      header: () => <span>IP Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.user?.defaultRole ?? "-",
      id: "accountType",
      cell: (info: any) => info.getValue(),
      header: () => <span>Account Type</span>,
      isSortable: false,
    },
  ];

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAuditLogDetailsQuery({
      params: {
        limit: 10,
        offset: params.offset,
        search: search?.search,
        accountType: search?.accountType ? search?.accountType : undefined,
      },
    });

  return (
    <Card sx={styles.cardWrapper}>
      <CardContent sx={{ pt: 2 }}>
        <Typography variant="h5" sx={{ color: "text.primary", mb: 3 }}>
          Audit Logs
        </Typography>
        <Box mb={3}>
          <TableHeader
            showClearFilterButton
            onChanged={(e) => {
              setSearch(e);
            }}
            tableHeaderData={auditLog}
          />
        </Box>
        <CustomTable
          data={data?.data?.auditLogs}
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

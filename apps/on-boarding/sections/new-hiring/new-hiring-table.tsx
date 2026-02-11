import { Avatar, Box, CardContent, Paper, Typography } from "@mui/material";
import { CustomChip, CustomTable, TableHeader } from "common";
import { useState } from "react";
import dayjs from "dayjs";
import { hiringTableFilter } from "./hiring-table.data";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Link from "next/link";
import { useGetNewHiringQuery } from "@services/new-hiring/new-hirimg-api";

export function NewHiringTable(): JSX.Element {
  const [search, setSearch] = useState<any>();
  const [params, setParams] = useState<any>();

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetNewHiringQuery({
      params: {
        limit: 10,
        offset: params?.offset,
        page: 1,
        search: search?.search,
      },
    });

  //Status Function
  function getColorBasedOnStatus(
    info: any
  ): "success" | "warning" | "danger" | "started" {
    if (info.row.original.employeeStatus === "Hired") {
      return "started";
    } else if (info.row.original.employeeStatus === "Invited") {
      return "warning";
    } else if (info.row.original.employeeStatus === "Active") {
      return "success";
    }
    return "started";
  }

  const columns = [
    {
      accessorFn: (row: any) => row?.firstName ?? "-",
      id: "name",
      cell: (info: any) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Box>
              <Box sx={{ mb: -0.5 }}>{info.getValue()}</Box>
              <Typography variant="caption">Research Analyst</Typography>
            </Box>
          </Box>
        );
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.department ?? "-",
      id: "department",
      cell: (info: any) => info.getValue(),
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.createdAt ?? "-",
      id: "hiringDate",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Hiring Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "email",
      cell: (info: any) => info.getValue(),
      header: () => <span>Email</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.contactNumber ?? "-",
      id: "phone",
      cell: (info: any) => info.getValue(),
      header: () => <span>Phone</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.employeeStatus ?? "-",
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
      accessorFn: (row: any) => row.action ?? "-",
      id: "Actions",
      cell: (info: any) => {
        return (
          <Link href={`/my-profile?memberId=${info?.row?.original._id}`}>
            <VisibilityOutlinedIcon
              sx={{ color: "text.secondary", cursor: "pointer" }}
            />
          </Link>
        );
      },
      header: () => <span>Action</span>,
    },
  ];

  return (
    <Paper>
      <CardContent sx={{ pt: 1 }}>
        <Box mb={2}>
          <TableHeader
            showClearFilterButton
            onChanged={(e) => {
              setSearch(e);
            }}
            tableHeaderData={hiringTableFilter}
          />
        </Box>
        <CustomTable
          data={data?.data?.users}
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
    </Paper>
  );
}

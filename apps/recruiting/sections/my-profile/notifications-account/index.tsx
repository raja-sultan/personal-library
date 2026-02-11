import { Box, MenuItem, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { renderUserImage } from "./image-profile";
import { CustomTable, TableIconActions, TableHeader } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useGetNotificationsAccountQuery } from "@services/my-profile/notifications-account/notifications-account-api";
import { NotificationViewModal } from "./notification-view-modal";
import dayjs from "dayjs";

export function NotificationsAccountSection(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<any>();
  const [notificationView, setNotificationView] = useState(null);

  const [page, setPage] = useState<any>({
    page: 1,
    offset: 0,
  });

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetNotificationsAccountQuery({
      params: {
        limit: 10,
        offset: page.offset,
        ...search,
      },
    });

  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => (
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          {renderUserImage({
            profileImage: original?.user?.profileImage ?? "",
            firstName: original?.user?.firstName ?? "-",
            lastName: original?.user?.lastName ?? "-",
          })}
          <Box>
            {original?.user?.firstName ?? "-"} {original?.user?.lastName ?? "-"}
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="text.secondary"
            >
              {original?.user?.email}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <span>User Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: "title",
      cell: (info: any) => info.getValue(),
      header: () => <span>Notice Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.type?.split("_").join(" "),
      id: "type",
      cell: (info: any) => info.getValue(),
      header: () => <span>Notice Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: "createdAt",
      cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
      header: () => <span>Notice Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.Action,
      id: "Action",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <TableIconActions icon={<TableActionsIcon />}>
            <MenuItem
              onClick={() => {
                setOpen(true);
                setNotificationView(info?.row?.original);
              }}
            >
              View
            </MenuItem>
          </TableIconActions>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];

  return (
    <Paper variant="elevation" elevation={1}>
      <Box p={2}>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            fontWeight={600}
            variant="h5"
            sx={{
              color: "text.primary",
            }}
          >
            Notifications
          </Typography>
        </Box>

        <TableHeader
          showClearFilterButton
          onChanged={(e: any) => {
            setSearch(e);
          }}
          tableHeaderData={[
            {
              type: "select",
              FieldProps: {
                name: "noticeType",
                label: "Notice Type",
              },
              options: [
                { label: "Email Notice", value: "email_notice" },
                { label: "Push Notice", value: "push_notice" },
                { label: "System Notice", value: "system_notice" },
              ],
            },
            {
              type: "date",
              FieldProps: {
                name: "startDate",
                label: "Start Date",
              },
            },
            {
              type: "date",
              FieldProps: {
                name: "endDate",
                label: "End Date",
              },
            },
            {
              type: "search",
              FieldProps: {
                name: "search",
                placeholder: "Search",
              },
            },
          ]}
        />
        <CustomTable
          data={data?.data?.notifications ?? []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination
          showSerialNo={false}
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setPage({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </Box>
      <NotificationViewModal
        open={open}
        setOpen={setOpen}
        notificationView={notificationView}
        setNotificationView={setNotificationView}
      />
    </Paper>
  );
}

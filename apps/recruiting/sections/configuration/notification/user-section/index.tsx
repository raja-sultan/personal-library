import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { CustomTable } from "common";
import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { StageAlertModal } from "./stage-alert-modal";
import { NotificationsModal } from "./notifications-modal";
import { useGetNotificationByUsersDataApiQuery } from "@services/jobs/job-details/notifications/notifications-api";

export function UserSection(): React.JSX.Element {
  const [userId, setUserId] = useState<any>("");
  const [stageId, setStageId] = useState<any>("");
  const [openStageAlertModal, setOpenStageAlertModal] =
    useState<boolean>(false);
  const [openNotificationsModal, setOpenNotificationsModal] =
    useState<boolean>(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
    limit: 10,
  });
  const { data, isLoading, isFetching, isError } =
    useGetNotificationByUsersDataApiQuery(params);
  console.log("users", data?.data?.users);
  const columns = [
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: "firstName",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.totalNotifications ?? "-",
      id: "totalNotifications",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Notifications</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.candidates ?? "-",
      id: "candidates",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Candidates</span>,
      isSortable: false,
    },

    {
      id: "Actions",
      cell: (info: any) => (
        <Stack>
          <MenuItem
            onClick={() => {
              setUserId(info?.row?.original?._id);
              setOpenNotificationsModal(true);
            }}
          >
            <ModeEditIcon />
            <Typography variant="caption">Notifications</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setStageId(info?.row?.original?._id);
              setOpenStageAlertModal(true);
            }}
          >
            <ModeEditIcon />
            <Typography variant="caption">Candidates</Typography>
          </MenuItem>
        </Stack>
      ),
      header: () => <span>Actions</span>,
    },
  ];
  return (
    <Stack>
      <CustomTable
        data={data?.data?.users}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
            limit: 10,
          });
        }}
      />
      <StageAlertModal
        openStageAlertModal={openStageAlertModal}
        setOpenStageAlertModal={setOpenStageAlertModal}
        stageId={stageId}
        setStageId={setStageId}
      />
      <NotificationsModal
        openNotificationsModal={openNotificationsModal}
        setOpenNotificationsModal={setOpenNotificationsModal}
        userId={userId}
        setUserId={setUserId}
      />
    </Stack>
  );
}

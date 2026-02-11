"use client";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableIconActions } from "common";
import React, { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import CloseReasonsForJobModalBox from "./close-reason-for-job-modal-box";
import DeleteModalBoxForCloseReasonForJob from "./delete-close-reason-for-job-modal-box";
import { useGetCloseReasonForJobListQuery } from "@services/configuration/close-reason-for-job-api/close-reason-for-job-api";

export default function CloseReasonsForJobSection(): JSX.Element {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [idForUpdateDelete, setIdForUpdateDelete] = useState("");

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const breadcrumbs = [
    { key: "", value: "Configuration", link: "/configuration" },
    { key: "", value: "Custom Options", link: "/configuration/custom-options" },
    { key: "", value: "Manage Close Reasons", link: "" },
  ];
  const { data, isLoading, isError, isSuccess } =
    useGetCloseReasonForJobListQuery({
      params: {
        limit: 10,
        offset: params.offset,
      },
    });

  const closeReasonDataList = data?.data?.closeReason;

  const getDataOnEdit =
    closeReasonDataList?.length &&
    closeReasonDataList?.find((row) => row?._id === idForUpdateDelete);

  const columns = [
    {
      accessorFn: (row: any) => row?.closeReason ?? "-",
      id: "closeReason",
      cell: (info: any) => info.getValue(),
      header: () => <span>Close Reasons For Job Openings</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "-",
      id: "Actions",
      cell: (info) => {
        return (
          <TableIconActions icon={<TableActionsIcon />}>
            <MenuItem
              onClick={() => {
                setOpenEditModal(true);
                setIsEditModal(true);
                setIdForUpdateDelete(info.row.original._id);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDeleteModal(true);
                setIdForUpdateDelete(info.row.original._id);
              }}
              sx={{ fontSize: 14 }}
            >
              Delete
            </MenuItem>
          </TableIconActions>
        );
      },
      header: () => <span>Action</span>,
    },
  ];

  return (
    <Grid>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <Typography variant="h6" my={1}>
        Manage Close Reason
      </Typography>
      <Box display="flex" mb={2} justifyContent={{ sm: "end", xs: "center" }}>
        {" "}
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setOpenEditModal(true);
            setIsEditModal(false);
            setIdForUpdateDelete("");
          }}
        >
          Create New Close Reason
        </Button>{" "}
      </Box>
      <CustomTable
        data={closeReasonDataList}
        columns={columns}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
      {openEditModal && (
        <CloseReasonsForJobModalBox
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          isEditModal={isEditModal}
          idForUpdateDelete={idForUpdateDelete}
          getDataOnEdit={getDataOnEdit?.closeReason}
        />
      )}

      {openDeleteModal && (
        <DeleteModalBoxForCloseReasonForJob
          idForUpdateDelete={idForUpdateDelete}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </Grid>
  );
}

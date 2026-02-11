"use client";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableIconActions } from "common";
import React, { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import InterviewerTagsModalBox from "./interviewer-tags-modal-box";
import DeleteInterviewerTagModalBox from "./delete-interviewer-tags-modal-box";
import { useGetInterviewerTagsListQuery } from "@services/configuration/interviewer-tags-api/interviewer-tags-api";

export default function InterviewerTagsSection(): JSX.Element {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [idForUpdateDelete, setIdForUpdateDelete] = useState("");

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const { data, isLoading, isError, isSuccess } =
    useGetInterviewerTagsListQuery({
      params: {
        limit: 10,
        offset: params.offset,
      },
    });

  const interViewerTagDataList = data?.data?.interviewerTags;
  const getDataOnEdit =
    interViewerTagDataList?.length &&
    interViewerTagDataList.find((row) => row?._id === idForUpdateDelete);

  const breadcrumbs = [
    { key: "", value: "Configuration", link: "/configuration" },
    { key: "", value: "Custom Options", link: "/configuration/custom-options" },
    { key: "", value: "Manage Interviewer Tags", link: "" },
  ];

  const columns = [
    {
      accessorFn: (row: any) => row?.interviewerTag ?? "-",
      id: "interviewerTag",
      cell: (info: any) => info.getValue(),
      header: () => <span>Interviewer Tags</span>,
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
        Manage Interviewer Tags
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
          Create New Interviewer Tags
        </Button>{" "}
      </Box>
      <CustomTable
        data={interViewerTagDataList}
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
        <InterviewerTagsModalBox
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          isEditModal={isEditModal}
          idForUpdateDelete={idForUpdateDelete}
          getDataOnEdit={getDataOnEdit?.interviewerTag}
        />
      )}

      {openDeleteModal && (
        <DeleteInterviewerTagModalBox
          idForUpdateDelete={idForUpdateDelete}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </Grid>
  );
}

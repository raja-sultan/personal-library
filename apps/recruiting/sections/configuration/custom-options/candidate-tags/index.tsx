"use client";
import { CustomBreadCrumbs, CustomTable, TableIconActions } from "common";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import useCandidateTags from "./use-candidate-tags";
import CandidateTagsForModalBox from "./candidate-tag-modal-box";
import DeleteCandidateTagModalBox from "./delete-candidate-tag-modal-box";

export default function CandidateTagsSection(): JSX.Element {
  const {
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    isEditModal,
    setIsEditModal,
    idForUpdateDelete,
    setIdForUpdateDelete,
    data,
    setParams,
    breadcrumbs,
    getDataOnEdit,
    candidateTagsList,
    isLoading,
    isError,
    isSuccess,
  } = useCandidateTags();
  const columns = [
    {
      accessorFn: (row: any) => row?.candidateTag ?? "-",
      id: "candidateTag",
      cell: (info: any) => info.getValue(),
      header: () => <span>Candidate Tags</span>,
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
        Manage Candidate Tags
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
          Create New Candidate Tag
        </Button>{" "}
      </Box>
      <CustomTable
        data={candidateTagsList}
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
        <CandidateTagsForModalBox
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          isEditModal={isEditModal}
          idForUpdateDelete={idForUpdateDelete}
          getDataOnEdit={getDataOnEdit?.candidateTag}
        />
      )}

      {openDeleteModal && (
        <DeleteCandidateTagModalBox
          idForUpdateDelete={idForUpdateDelete}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </Grid>
  );
}

import { Delete, Edit } from "@assets/common";
import { Button, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import {
  useDeleteFormMutation,
  useGetFormListForTableQuery,
} from "@services/jobs/job-details/forms/forms-api";
import { CustomTable } from "common";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FormDeleteModal } from "../modals/delete-modal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { jobActions } from "@root/slices/jobs/reducer";

export default function FormDetailsTable(): JSX.Element {
  const [params, setParams] = useState({
    limit: "10",
    offset: "0",
  });
  const [openDeleteModal, setOpenDeleteModal] = useState<
    string | null | undefined
  >(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetFormListForTableQuery({
      jobId,
      params,
    });

  console.log(data?.data);

  const [deleteEntry] = useDeleteFormMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteEntry({ id }).unwrap();
      toast.success("Entry Deleted Successfully");
      setOpenDeleteModal(null);
    } catch {
      toast.error("Something went wrong");
    }
  };
  const dispatch = useDispatch();
  const formColumns = [
    {
      accessorFn: (row: any) => row?.formName,
      id: "formName",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start" pl={2}>
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Form Name</span>,
    },
    {
      accessorFn: (row: any) => row?.jobsStage?.stageName,
      id: "stageName",
      cell: (info: any) => info.getValue(),
      header: () => <Box component="span">Form Stage</Box>,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: "actions",
      cell: (info) => (
        <Box>
          <IconButton>
            <Edit
              onClick={() => {
                router.push(
                  `/jobs/job-details/forms?jobId=${jobId}&formId=${info.getValue()}`
                );
                dispatch(jobActions.setState({ editMode: true }));
              }}
            />
          </IconButton>
          <IconButton>
            <Delete
              onClick={() => {
                setOpenDeleteModal(info.getValue());
              }}
            />
          </IconButton>
        </Box>
      ),
      header: () => <Box component="span">Action</Box>,
    },
  ];

  return (
    <Grid>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              jobActions.setState({ editMode: true, formMode: "new-form" })
            );
          }}
        >
          Create a Form
        </Button>
      </Box>

      <CustomTable
        data={data?.data || []}
        columns={formColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        onPageChange={(offset) => {
          setParams((prev) => ({ ...prev, offset }));
        }}
      />
      {Boolean(openDeleteModal) && (
        <FormDeleteModal
          open={openDeleteModal}
          onClose={setOpenDeleteModal}
          deleteClickHandler={() => {
            deleteHandler(openDeleteModal).catch(() => {});
          }}
        />
      )}
    </Grid>
  );
}

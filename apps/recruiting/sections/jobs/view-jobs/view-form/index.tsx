import { Delete, Edit } from "@assets/common";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { jobActions } from "@root/slices/jobs/reducer";
import CreateForm from "@sections/jobs/job-details/forms/form-fields-section/create-form";
import {
  useDeleteFormTableMutation,
  useGetFormTableQuery,
} from "@services/jobs/view-jobs/forms/forms-table-api";
import { CustomTable, WarningPrompt } from "common";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { style } from "./view-form-style";
import { useEffect } from "react";

export function ViewForm(props: { route?: boolean }): JSX.Element {
  const { route } = props;
  const searchParams = useSearchParams();
  const [deleteFormTableFunction] = useDeleteFormTableMutation();
  const jobId = searchParams.get("jobId");
  const {
    data: formTableData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetFormTableQuery({
    jobId,
    limit: 10,
  });

  const editMode = useSelector((state: any) => state.jobs.editMode);
  const dispatch = useDispatch();

  const columns = [
    {
      accessorFn: (row) => row?.formName ?? "-",
      id: "formName",
      cell: (info) => info.getValue(),
      header: () => <Box component="span">Form Name</Box>,
    },
    {
      accessorFn: (row) => row?.jobsStage?.stageName ?? "---",
      id: "jobStage",
      cell: (info) => info.getValue(),
      header: () => <Box component="span">Form Stage</Box>,
    },
    {
      accessorFn: (row) => row?._id,
      id: "actions",
      cell: (info) => (
        <Box display="flex" alignItems="center">
          <Link
            href={{
              pathname: !route ? "" : "/jobs/actions",
              query: { formId: info.getValue(), jobId },
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(jobActions.setState({ editMode: true }));
              }}
            >
              <Edit sx={{ color: "primary.main" }} />
            </IconButton>
          </Link>

          <WarningPrompt
            mainColor="error.main"
            heading="Delete Form"
            subTitle="Are you sure you want to delete this form?"
            modelOpenLabel={
              <Delete sx={{ color: "error.main", fontSize: 25 }} />
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                deleteFormTableFunction(info.getValue());
              },
            }}
          />
        </Box>
      ),
      header: () => <span>Action</span>,
    },
  ];
  useEffect(() => {
    dispatch(jobActions.reset());
  }, [dispatch]);
  return (
    <Paper sx={style.formDiv}>
      <Typography variant="h4" sx={style.formTitle}>
        Forms
      </Typography>
      {editMode ? (
        <CreateForm route={route} />
      ) : (
        <CustomTable
          columns={columns}
          data={formTableData?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination={false}
        />
      )}
    </Paper>
  );
}

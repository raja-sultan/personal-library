import { useState } from "react";
import { WarningPrompt } from "common";
import { Edit, Delete } from "@assets/common";
import { EditFormModal } from "./edit-form-modal";
import { Box, IconButton, Typography } from "@mui/material";
import type { Columns, overViewFormReturnType } from "./overview-form-types";
import { useDeleteFormTableMutation } from "@services/jobs/view-jobs/forms/forms-table-api";

export function OverviewFormTableData(): overViewFormReturnType {
  const [editForm, setEditForm] = useState<boolean>(false);

  const [deleteOverviewFormFunction] = useDeleteFormTableMutation();
  const columns: Columns[] = [
    {
      accessorFn: (row) => row?.formName,
      id: "formName",
      cell: (info) => (
        <Typography variant="body1">{info.getValue()}</Typography>
      ),
      header: () => <Typography variant="body1">Form Name</Typography>,
    },
    {
      accessorFn: (row) => row?.jobStage,
      id: "jobStage",
      cell: (info) => (
        <Typography variant="body1">{info.getValue()}</Typography>
      ),
      header: () => <Typography variant="body1">Form Stage</Typography>,
    },
    {
      accessorFn: (row) => row?._id,
      id: "actions",
      cell: (info) => (
        <Box display="flex" justifyContent="start" alignItems="center">
          <IconButton
            onClick={() => {
              setEditForm(true);
            }}
          >
            <Edit
              sx={{ color: "text.primary", position: "relative", top: "-3px" }}
            />
            <EditFormModal editForm={editForm} setEditForm={setEditForm} />
          </IconButton>
          <WarningPrompt
            mainColor="error.main"
            heading="Delete Form"
            subTitle="Are you sure you want to delete this form?"
            modelOpenLabel={<Delete />}
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                deleteOverviewFormFunction(info.getValue());
              },
            }}
          />
        </Box>
      ),
      header: () => <Typography variant="body1">Action</Typography>,
    },
  ];

  return {
    columns,
  };
}

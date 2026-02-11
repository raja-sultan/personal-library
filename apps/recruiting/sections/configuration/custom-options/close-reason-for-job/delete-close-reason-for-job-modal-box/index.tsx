import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { useDeleteCloseReasonForJobMutation } from "@services/configuration/close-reason-for-job-api/close-reason-for-job-api";
import { CustomModal } from "common";
import React from "react";
import toast from "react-hot-toast";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function DeleteModalBoxForCloseReasonForJob(props): JSX.Element {
  const { openDeleteModal, setOpenDeleteModal, idForUpdateDelete } = props;
  const theme = useTheme();
  const [deleteCloseReason, { isLoading }] =
    useDeleteCloseReasonForJobMutation();

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteCloseReason(idForUpdateDelete);
      toast.success(`Close Reason deleted successfully!`);
      setOpenDeleteModal(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

  return (
    <CustomModal
      isOpen={openDeleteModal}
      onClose={setOpenDeleteModal}
      closeButtonProps={{
        onClick: () => {
          setOpenDeleteModal(false);
        },
      }}
      headerLabel={
        <>
          <HighlightOffIcon /> Remove Reason
        </>
      }
      headerTypographyProps={{
        color: theme.palette.error.main,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
      rootSx={{
        maxWidth: { md: 650, xs: 350, sm: 500 },
        borderRadius: 0.5,
        px: 1,
        pt: 1,
        pb: 0,
        overflow: "scroll",
        border: `1px solid ${theme.palette.error.main}`,
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
    >
      <Box>
        <Box mb={1} display="flex" flexDirection="column" alignItems="start">
          <FormControlLabel
            control={<Checkbox sx={{ px: 1 }} />}
            label={
              <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                I want any entity using this interviewer tag to use this
                instead.
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox sx={{ px: 1, py: 0 }} />}
            label={
              <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                I want to permanently delete this interviewer tag without
                re-assigning
              </Typography>
            }
          />
        </Box>
        <Box display="flex" justifyContent="end" gap={2}>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            Delete Close Reason
          </LoadingButton>
        </Box>
      </Box>
    </CustomModal>
  );
}

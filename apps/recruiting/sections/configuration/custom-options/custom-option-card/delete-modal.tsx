import { DeleteIcon } from "@assets/configuration-custom-options";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/system";
import { CustomModal } from "common";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDeleteCustomFieldMutation } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import toast from "react-hot-toast";

function DeleteModal(props: any): JSX.Element {
  const [deleteField, setDeleteField] = useState<any>(false);
  const { cardItems } = props;
  const [deleteHandler] = useDeleteCustomFieldMutation();
  return (
    <>
      <IconButton
        onClick={() => {
          setDeleteField(true);
        }}
      >
        <DeleteIcon
          sx={{ color: "error.main", width: "20px", height: "20px" }}
        />
      </IconButton>

      <CustomModal
        onClose={() => {
          setDeleteField(false);
        }}
        rootSx={{
          maxWidth: { xs: 350, sm: 500 },
        }}
        headerLabel={
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <HighlightOffIcon sx={{ color: "error.main" }} />
            <Typography variant="subtitle2" ml={1}>
              Remove Field
            </Typography>
          </Stack>
        }
        closeButtonProps={{
          onClick: () => {
            setDeleteField(false);
          },
        }}
        isOpen={deleteField}
      >
        <Typography variant="subtitle2" color="neutral.500">
          Are you sure you want to remove? Any existing data for this field will
          still be visible, but the field will no longer show up for new agency
          questions.
        </Typography>
        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setDeleteField(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ backgroundColor: "error.dark" }}
            variant="contained"
            onClick={async (): Promise<void> => {
              try {
                const res: any = await deleteHandler({
                  fieldId: cardItems?._id,
                });
                toast.success(
                  res.message ?? "Custom Field Deleted successfully"
                );
              } catch (error) {
                toast.error(error?.data?.message ?? "Something went wrong");
              }
            }}
          >
            Yes, remove it
          </Button>
        </Box>
      </CustomModal>
    </>
  );
}

export default DeleteModal;

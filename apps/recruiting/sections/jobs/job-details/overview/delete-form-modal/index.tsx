import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { Box, Button, Typography } from "@mui/material";

export function DeleteFormModal({
  deleteForm,
  setDeleteForm,
}: {
  deleteForm: boolean;
  setDeleteForm: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setDeleteForm}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Delete Form"
      closeButtonProps={{
        onClick: () => {
          setDeleteForm(false);
        },
      }}
      isOpen={deleteForm}
    >
      <Typography variant="body2">
        Are you sure you want to delete this form?
      </Typography>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </CustomModal>
  );
}

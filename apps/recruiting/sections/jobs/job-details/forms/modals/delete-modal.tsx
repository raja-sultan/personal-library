import { CustomModal } from "common";
import { Box, Button, Typography } from "@mui/material";

export function FormDeleteModal({
  open,
  onClose,
  deleteClickHandler,
}): JSX.Element {
  return (
    /*Custom Modal*/
    <CustomModal
      onClose={() => {
        onClose(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Delete Form"
      closeButtonProps={{
        onClick: () => {
          onClose(false);
        },
      }}
      isOpen={open}
    >
      <Typography variant="body2">
        Are you sure you want to delete this form?
      </Typography>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            onClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteClickHandler()}
        >
          Delete
        </Button>
      </Box>
    </CustomModal>
  );
}
